package com.ssafy.backend.service;

import com.ssafy.backend.model.entity.Room;
import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.exception.InvalidSessionCreate;
import com.ssafy.backend.model.exception.RoomNotFoundException;
import com.ssafy.backend.model.exception.SessionNotFoundException;
import com.ssafy.backend.model.exception.SessionTokenNotValid;
import com.ssafy.backend.model.repository.RoomRepository;
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

    /**
     * < 게시글 번호, 세션 객체 >
     */
    private Map<Long, Session> mapSessions = new ConcurrentHashMap<>();

    private Map<Long, Map<String, OpenViduRole>> mapSessionNamesTokens = new ConcurrentHashMap<>();


    private Map<String, Boolean> sessionRecordings = new ConcurrentHashMap<>();


    public SessionServiceImpl(@Value("${openvidu.url}") String openViduUrl, @Value("${openvidu.secret}") String openViduSecret, RoomRepository roomRepository) {
        this.openViduUrl = openViduUrl;
        this.openViduSecret = openViduSecret;
        this.roomRepository = roomRepository;
        this.openVidu = new OpenVidu(openViduUrl, openViduSecret);
    }


    @Override
    public void createSession(String userId, long sessionIdx) throws OpenViduJavaClientException, OpenViduHttpException {
        // 만약 세션이 없다면 세션을 만든다.
        if(searchSession(sessionIdx) == null) {
            // DB에서 room 엔티티 가져온다.
            Room room = roomRepository.findById(sessionIdx).orElseThrow(
                    () -> new RoomNotFoundException("Room Not Found in Session Create")
            );

            // 글 작성자가 아닌 사람이 생성 시도했을 경우
            if(userId.equals(room.getUser().getId())) {
                throw new InvalidSessionCreate("Not Room's writer in Session Create Try");
            }

            // 세션 만든다.
            Session session = this.openVidu.createSession();

            // Map에 세션 저장
            this.mapSessions.put(sessionIdx, session);

            // 유저 토큰 저장할 Map 생성
            this.mapSessionNamesTokens.put(sessionIdx, new ConcurrentHashMap<>());

            // 라이브 여부 반영
            room.updateRoomState(true);
//            room.
        }
    }

    @Override
    public String enterSession(User user, long sessionIdx, OpenViduRole role) throws OpenViduJavaClientException, OpenViduHttpException {
        try {
            // 연결 정보를 설정한다.
            String userData = String.format("{\"nickname\": \"%s\", \"rank\":\"0\"}", user.getNickname());
            ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(ConnectionType.WEBRTC)
                    .role(role).data(userData).build();

            // 들어갈 세션을 찾는다.
            Session session = searchSession(sessionIdx);
            if(session == null) {
                throw new SessionNotFoundException("Session Not Found");
            }
            // 세션에 접속해서 토큰정보를 받아온다,
            String token = session.createConnection(connectionProperties).getToken();

            // 토큰 정보를 저장
            this.mapSessionNamesTokens.get(sessionIdx).put(token, role);
            
            // DB에도 반영
            
            return token;
        } catch (OpenViduHttpException e) {
            // 404이면 OpenVidu 서버에서 세션이 없다는 뜻!
            if ( 404 == e.getStatus() ) {
                this.mapSessions.remove(sessionIdx);
                this.mapSessionNamesTokens.remove(sessionIdx);
            }
            throw new SessionNotFoundException("enter session error");
        }
    }

    @Override
    public void leaveSession(long sessionIdx, String token) {
        Session session = searchSession(sessionIdx);
        if(session == null || this.mapSessionNamesTokens.get(sessionIdx) == null) {
            throw new SessionNotFoundException("Session Not Found");
        }
        System.out.println(this.mapSessionNamesTokens.get(sessionIdx));
        System.out.println(this.mapSessionNamesTokens.get(sessionIdx) == null);
        System.out.println(this.mapSessionNamesTokens.get(sessionIdx).getClass().getName());

        // 토큰을 제거한다.
        if (this.mapSessionNamesTokens.get(sessionIdx).remove(token) != null) {
            // 만약 토큰이 있었다면 ( 제거에 성공 ) 세션에 남은 사람들 체크
            if (this.mapSessionNamesTokens.get(sessionIdx).isEmpty()) {
                // Last user left: session must be removed
                this.mapSessions.remove(sessionIdx);
                this.mapSessionNamesTokens.remove(sessionIdx);
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

    public JSONObject testas() throws OpenViduJavaClientException, OpenViduHttpException {
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

    @Override
    public JSONObject twotwotwo() throws OpenViduJavaClientException, OpenViduHttpException {
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
}
