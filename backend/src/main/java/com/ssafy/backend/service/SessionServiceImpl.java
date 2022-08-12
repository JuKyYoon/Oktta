package com.ssafy.backend.service;

import com.ssafy.backend.model.entity.Room;
import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.exception.*;
import com.ssafy.backend.model.repository.RoomRepository;
import com.ssafy.backend.util.RedisService;
import io.openvidu.java.client.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class SessionServiceImpl implements SessionService {
    private final OpenVidu openVidu;

    private final String openViduUrl;
    // Secret shared with our OpenVidu server
    private final String openViduSecret;

    private final RoomRepository roomRepository;

    private final RedisService redisService;

    /**
     * < 게시글 번호, 세션 객체 >
     */
    private Map<Long, Session> mapSessions = new ConcurrentHashMap<>();

    private Map<Long, Map<String, OpenViduRole>> mapSessionNamesTokens = new ConcurrentHashMap<>();

    public SessionServiceImpl(@Value("${openvidu.url}") String openViduUrl, @Value("${openvidu.secret}") String openViduSecret, RoomRepository roomRepository, RedisService redisService) {
        this.openViduUrl = openViduUrl;
        this.openViduSecret = openViduSecret;
        this.roomRepository = roomRepository;
        this.redisService = redisService;
        this.openVidu = new OpenVidu(openViduUrl, openViduSecret);
    }

    @Override
    public Room getSessionRoom(long sessionIdx) {
        Room room = roomRepository.findById(sessionIdx).orElseThrow(
                () -> new RoomNotFoundException("Room Not Found in Session Create")
        );
        return room;
    }

    public boolean checkSessionOwner(String userId, Room room) {
        if(userId.equals(room.getUser().getId())) {
            // 이 경우는 무조건 만든다.
            return true;
        } else {
            return false;
        }

    }


    @Override
    public void createSession(String userId, long sessionIdx, Room room) throws OpenViduJavaClientException, OpenViduHttpException {
        // 검증 과정을 먼저 해줘야, 강제로 세션을 만들고, 입장하려는 시도를 막을 수 있다.
        room.updateRoomState(true);
        roomRepository.save(room);
        // 만약 세션이 없다면 세션을 만든다.
        if(searchSession(sessionIdx) == null) {
            // 세션 만든다.
            Session session = this.openVidu.createSession();

            // Map에 세션 저장
            this.mapSessions.put(sessionIdx, session);

            // 유저 토큰 저장할 Map 생성
            this.mapSessionNamesTokens.put(sessionIdx, new ConcurrentHashMap<>());

        } else {
            // 이미 존재하는 세션일 때 어떤 행동 해줘야 할까
            // 어차피 Session 객체 있으니깐 행동 안해줘도 상관 없다.
        }
    }

    @Override
    public String enterSession(User user, long sessionIdx, OpenViduRole role) throws OpenViduJavaClientException, OpenViduHttpException {
        try {
            // 연결 정보를 설정한다.
            String userData = String.format("{\"nickname\": \"%s\", \"rank\":\"0\", \"idx\":\"%d\"}", user.getNickname(), sessionIdx);
            ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(ConnectionType.WEBRTC)
                    .role(role).data(userData).build();

            // 들어갈 세션을 찾는다.
            Session session = searchSession(sessionIdx);
            if(session == null) {
                throw new SessionNotFoundException("Session Not Found");
            }

            // 세션에 이미 들어가 있는지 검사한다.
            String sessionUser = (String) redisService.getHashValue(session.getSessionId(), user.getNickname());
            if(sessionUser != null) {
                // 이 때, 원래 토큰 찾아서 return 해주나?
                System.out.println(sessionUser);
                throw new DuplicatedEnterSession("You are already in the Session");
            }

            // 세션에 접속해서 토큰정보를 받아온다,
            String token = session.createConnection(connectionProperties).getToken();

            // 토큰 정보를 저장
            this.mapSessionNamesTokens.get(sessionIdx).put(token, role);
            
            // 레디스에 입장 유저 반영
            redisService.setValue(session.getSessionId(), user.getNickname(), token);

            return token;
        } catch (OpenViduHttpException e) {
            // 404이면 OpenVidu 서버에서 세션이 없다는 뜻!
            if ( 404 == e.getStatus() ) {
                String sessionId = this.mapSessions.get(sessionIdx).getSessionId();
                // 메모리 초기화
                this.mapSessions.remove(sessionIdx);
                this.mapSessionNamesTokens.remove(sessionIdx);

                //Redis 도 초기화시켜준다.
                redisService.deleteKey(sessionId);
            }
            throw new SessionNotFoundException("enter session error");
        }
    }

    @Override
    public void leaveSession(long sessionIdx, String token, String nickname) {
        // 나갈 세션을 찾는다.
        System.out.println(sessionIdx);
        System.out.println(token);
        Session session = searchSession(sessionIdx);
        if(session == null || this.mapSessionNamesTokens.get(sessionIdx) == null) {
//            throw new SessionNotFoundException("Session Not Found");
            return;
        }

        // 토큰을 제거한다.
        if (this.mapSessionNamesTokens.get(sessionIdx).remove(token) != null) {
            // redis 에서도 토큰 제거
            redisService.deleteKey(session.getSessionId(), nickname);

            // 만약 토큰이 있었다면 ( 제거에 성공 ) 세션에 남은 사람들 체크
            if (this.mapSessionNamesTokens.get(sessionIdx).isEmpty()) {
                // 만약 다 나갔으면 세션도 제거해준다.
                this.mapSessions.remove(sessionIdx);
                this.mapSessionNamesTokens.remove(sessionIdx);
                redisService.deleteKey(session.getSessionId());

                Room room = roomRepository.findById(sessionIdx).orElseThrow(
                        () -> new RoomNotFoundException("Room Not Found in Session Create")
                );
                room.updateRoomState(false);
            } else {


            }
        } else {
            // 토큰이 유효하지 않음.
            throw new SessionTokenNotValid("Leave Session Error");
        }


    }

    public Session searchSession(long sessionIdx) {
        return this.mapSessions.get(sessionIdx);
    }

    public JSONObject connectionPrint() throws OpenViduJavaClientException, OpenViduHttpException {
        Iterator<Long> keys = this.mapSessionNamesTokens.keySet().iterator();
        JSONArray b = new JSONArray();
        while(keys.hasNext()) {
            long k = keys.next();
            b.add(k);
            b.add(mapSessionNamesTokens.get(k));
        }
        JSONObject ret = new JSONObject();
        ret.put("connections", b);
        return ret;
    }

    @Override
    public void clearSession() {
        this.mapSessions.clear();
        this.mapSessionNamesTokens.clear();
    }

    /**
     * Openvidu의 세션 리스트 불러오기
     * @return
     * @throws OpenViduJavaClientException
     * @throws OpenViduHttpException
     */
    @Override
    public JSONObject getSessionsFromOpenVidu() throws OpenViduJavaClientException, OpenViduHttpException {
        this.openVidu.fetch();
        List<Session> activeSessions = this.openVidu.getActiveSessions();
        JSONArray b = new JSONArray();
        for (Session activeSession : activeSessions) {
            System.out.println(activeSession.getSessionId());
            b.add(activeSession);
        }
        JSONObject ret = new JSONObject();
        ret.put("sessions", b);
        return ret;
    }

    /**
     * 자바 메모리에 저장된 session 리스트 불러오기
     * @return
     * @throws OpenViduJavaClientException
     * @throws OpenViduHttpException
     */
    @Override
    public JSONObject getSessionsFromJava() throws OpenViduJavaClientException, OpenViduHttpException {
        Iterator<Long> keys = this.mapSessions.keySet().iterator();
        JSONArray b = new JSONArray();
        while(keys.hasNext()) {
            long k = keys.next();
            b.add(k);
            b.add(this.mapSessions.get(k));
        }
        JSONObject ret = new JSONObject();
        ret.put("sessions", b);
        return ret;
    }

    @Override
    public void closeSession(long sessionIdx) throws OpenViduJavaClientException, OpenViduHttpException {
        // 세션을 찾는다.
        Session session = this.searchSession(sessionIdx);

        if(session != null) {
            String sessionId = session.getSessionId();
            session.close();
            this.mapSessions.remove(sessionIdx);
            this.mapSessionNamesTokens.remove(sessionIdx);
            redisService.deleteKey(sessionId);
        }

    }
}
