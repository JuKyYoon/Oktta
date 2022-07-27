package com.ssafy.backend.service;

import com.ssafy.backend.model.exception.SessionNotFoundException;
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

    /**
     * < 게시글 번호, 세션 객체 >
     */
    private Map<Long, Session> mapSessions = new ConcurrentHashMap<>();

    private Map<String, Map<String, OpenViduRole>> mapSessionNamesTokens = new ConcurrentHashMap<>();

    private Map<String, Boolean> sessionRecordings = new ConcurrentHashMap<>();


    public SessionServiceImpl(@Value("${openvidu.url}") String openViduUrl, @Value("${openvidu.secret}") String openViduSecret) {
        this.openViduUrl = openViduUrl;
        this.openViduSecret = openViduSecret;
        this.openVidu = new OpenVidu(openViduUrl, openViduSecret);
    }


    @Override
    public void createSession(long sessionIdx) throws OpenViduJavaClientException, OpenViduHttpException {
        if(searchSession(sessionIdx) == null) {
            Session session = this.openVidu.createSession();
            this.mapSessions.put(sessionIdx, session);
        }
    }

    @Override
    public String enterSession(long sessionIdx, OpenViduRole role) throws OpenViduJavaClientException, OpenViduHttpException {
        ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(ConnectionType.WEBRTC)
                .role(role).data("test user").build();
        Session session = searchSession(sessionIdx);
        if(session == null) {
            throw new SessionNotFoundException("Session Not Found");
        }
        return session.createConnection(connectionProperties).getToken();
    }

    public Session searchSession(long sessionIdx) {
        return this.mapSessions.get(sessionIdx);
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
