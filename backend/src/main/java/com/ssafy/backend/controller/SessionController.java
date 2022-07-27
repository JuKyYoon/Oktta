package com.ssafy.backend.controller;

import com.ssafy.backend.model.response.BaseResponseBody;
import io.openvidu.java.client.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/session")
public class SessionController {

    private OpenVidu openVidu;

    private Map<String, Session> mapSessions = new ConcurrentHashMap<>();
    private Map<String, Map<String, OpenViduRole>> mapSessionNamesTokens = new ConcurrentHashMap<>();
    private Map<String, Boolean> sessionRecordings = new ConcurrentHashMap<>();

    // URL where our OpenVidu server is listening
    private String OPENVIDU_URL;
    // Secret shared with our OpenVidu server
    private String SECRET;

    @Value("${response.success}")
    private String successMsg;

    @Value("${response.fail}")
    private String failMsg;

    public SessionController(@Value("${openvidu.secret}") String secret, @Value("${openvidu.url}") String openviduUrl) {
        this.SECRET = secret;
        this.OPENVIDU_URL = openviduUrl;
        this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
    }

    /**
     * 세션별 인원수 API -수정해야함-
     * 추후 DB 컬럼 수정 후 DB에서 관리할 것
     */
    @GetMapping("/participant")
    public ResponseEntity<JSONObject> getNumberofParticipant() throws OpenViduJavaClientException, OpenViduHttpException {
        this.openVidu.fetch();
        JSONArray jsonArray = new JSONArray();
        for (Session session : this.openVidu.getActiveSessions()) {
            JSONObject json = new JSONObject();
            json.put("sessionId", session.getSessionId());
            json.put("numberOfPartcipants", session.getConnections().size());
            jsonArray.add(json);
        }
        JSONObject ret = new JSONObject();
        ret.put("sessions", jsonArray);
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }

    /**
     * 세션 입장 시 DB 인원 수 증가 반영
     */
    @PostMapping("/join/{sessionId}")
    public ResponseEntity<BaseResponseBody> joinParticipant(@PathVariable("sessionId") String sessionId) {

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, successMsg));
    }

    /**
     * 세션 퇴장 시 DB 인원 수 감소 반영
     * param으로 sessionId 와 userToken 정보 받아서 실제로 유저가 해당 세션에 있었을 경우 처리
     */
    @PostMapping("/exit")
    public ResponseEntity<BaseResponseBody> exitParticipant(@RequestBody Map<String, Object> sessionNameToken) {
        String sessionId = (String) sessionNameToken.get("sessionId");
        String userToken = (String) sessionNameToken.get("userToken");
        if (this.mapSessions.get(sessionId) != null && this.mapSessionNamesTokens.get(sessionId) != null) {


        } else {

        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, successMsg));
    }
}
