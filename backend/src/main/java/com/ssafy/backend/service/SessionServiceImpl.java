package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.SessionEventDto;
import com.ssafy.backend.model.entity.LolAuth;
import com.ssafy.backend.model.entity.Room;
import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.entity.Video;
import com.ssafy.backend.model.exception.*;
import com.ssafy.backend.model.repository.LolAuthRepository;
import com.ssafy.backend.model.repository.RoomRepository;
import com.ssafy.backend.model.repository.UserRepository;
import com.ssafy.backend.model.repository.VideoRepository;
import com.ssafy.backend.util.RedisService;
import io.openvidu.java.client.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
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

    private final UserRepository userRepository;

    private final VideoRepository videoRepository;

    private final LolAuthRepository lolAuthRepository;

    /**
     * < 게시글 번호, 세션 객체 >
     */
    private Map<Long, Session> mapSessions = new ConcurrentHashMap<>();

    private Map<Long, Map<String, OpenViduRole>> mapSessionNamesTokens = new ConcurrentHashMap<>();

    private Map<String, Boolean> sessionRecordings = new ConcurrentHashMap<>();

    public SessionServiceImpl(@Value("${openvidu.url}") String openViduUrl, @Value("${openvidu.secret}") String openViduSecret, RoomRepository roomRepository, RedisService redisService, UserRepository userRepository, VideoRepository videoRepository, LolAuthRepository lolAuthRepository) {
        this.openViduUrl = openViduUrl;
        this.openViduSecret = openViduSecret;
        this.roomRepository = roomRepository;
        this.redisService = redisService;
        this.lolAuthRepository = lolAuthRepository;
        this.openVidu = new OpenVidu(openViduUrl, openViduSecret);
        this.userRepository = userRepository;
        this.videoRepository = videoRepository;
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
    public String enterSession(String userId, long sessionIdx, OpenViduRole role) throws OpenViduJavaClientException, OpenViduHttpException {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("User Not Found")
        );

        LolAuth lolAuth = lolAuthRepository.findByUserId(user.getId()).orElse(null);
        int tier = lolAuth != null ? lolAuth.getTier() : 0;

        try {
            // 연결 정보를 설정한다.
            String userData = String.format("{\"nickname\": \"%s\", \"rank\":\"%d\", \"idx\":\"%d\"}", user.getNickname(), tier,sessionIdx);
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
    public void increaseRoomPeople(Room room, boolean isOwner) {
        if(isOwner) {
            room.createRoomLive();
        } else {
            room.enterRoomLive();
        }
        roomRepository.save(room);
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
            Room room = roomRepository.findById(sessionIdx).orElseThrow(
                    () -> new RoomNotFoundException("Room Not Found in Session Create")
            );
            // 만약 토큰이 있었다면 ( 제거에 성공 ) 세션에 남은 사람들 체크
            if (this.mapSessionNamesTokens.get(sessionIdx).isEmpty()) {
                // 만약 다 나갔으면 세션도 제거해준다.
                this.mapSessions.remove(sessionIdx);
                this.mapSessionNamesTokens.remove(sessionIdx);
                redisService.deleteKey(session.getSessionId());
                room.closeRoomLive();
            } else {
                room.leaveRoomLive();
            }
            roomRepository.save(room);
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

    @Override
    public Map<Boolean, Recording> recordingStart(String userId, Long roomIdx, Map<String, Object> params) {
        Map<Boolean, Recording> result = new HashMap<>();

        // 403 -> throw
        if(!check(userId, roomIdx)) {
            result.put(false, null);
            return result;
        }

        RecordingProperties properties = new RecordingProperties.Builder().recordingLayout(RecordingLayout.CUSTOM).name(roomIdx.toString()).build();

        String sessionId = (String) params.get("sessionId");
        try {
            Recording recording = this.openVidu.startRecording(sessionId, properties);
            this.sessionRecordings.put(sessionId, true);
            result.put(true, recording);
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            result.put(true, null);
        } finally {
            return result;
        }
    }

    @Override
    public Map<Boolean, Recording> recordingStop(String userId, Long roomIdx, Map<String, Object> params) {
        Map<Boolean, Recording> result = new HashMap<>();

        // 403 -> throw
        if(!check(userId, roomIdx)) {
            result.put(false, null);
            return result;
        }

        String recordingId = (String) params.get("recording");
        try {
            Recording recording = this.openVidu.stopRecording(recordingId);
            this.sessionRecordings.remove(recording.getSessionId());
            result.put(true, recording);
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            result.put(true, null);
        } finally {
            return result;
        }
    }

    @Override
    public boolean saveRecordUrl(Long roomIdx, SessionEventDto dto) {
        Room room = roomRepository.findById(roomIdx).orElseThrow(
                () -> new RoomNotFoundException("Room Not Found Exception")
        );

        // 녹화 시간 검사
        if(dto.getDuration() < 30)
            return false;

        StringBuilder sb = new StringBuilder();
        sb.append("https://i7a104.p.ssafy.io/recordings/" + dto.getId() + "/" + dto.getName() + ".mp4");

        videoRepository.save(new Video.Builder(room, sb.toString()).build());
        return true;
    }

    @Override
    public List<String> getVideos(Long roomIdx) {
        Room room = roomRepository.findById(roomIdx).orElseThrow(
                () -> new RoomNotFoundException("Room Not Found Exception")
        );

        return videoRepository.findRecordUrlByRoom(room);
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
    public void closeSession(long sessionIdx, Room room) {
        // 세션을 찾는다.
        Session session = this.searchSession(sessionIdx);
        room.closeRoomLive();
        roomRepository.save(room);


        if(session != null) {
            try {
                String sessionId = session.getSessionId();
                session.close();
                this.mapSessions.remove(sessionIdx);
                this.mapSessionNamesTokens.remove(sessionIdx);
                redisService.deleteKey(sessionId);
            } catch (OpenViduHttpException  e) {
            // 404이면 OpenVidu 서버에서 세션이 없다는 뜻!
                if ( 404 == e.getStatus() ) {
                    String sessionId = this.mapSessions.get(sessionIdx).getSessionId();
                    // 메모리 초기화
                    this.mapSessions.remove(sessionIdx);
                    this.mapSessionNamesTokens.remove(sessionIdx);

                    //Redis 도 초기화시켜준다.
                    redisService.deleteKey(sessionId);
                }
            } catch (OpenViduJavaClientException e) {
                e.printStackTrace();
            }
        }
    }

    private boolean check(String userId, Long roomIdx){

        // 유저 없음
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("User Not Found")
        );

        // 글 없음
        Room room = roomRepository.findById(roomIdx).orElseThrow(
                () -> new RoomNotFoundException("Room Not Found")
        );

        // 세션 없음
        if(searchSession(roomIdx) == null) {
            throw new SessionNotFoundException("Session Not Found");
        }

        // 글 작성자 아님. -> 권한 없음. -> 403 처리 해야하는데...
        if(user.getIdx() != room.getUser().getIdx()) {
            return false;
        }

        return true;
    }
}
