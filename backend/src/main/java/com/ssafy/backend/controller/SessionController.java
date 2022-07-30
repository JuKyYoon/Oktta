package com.ssafy.backend.controller;

import com.ssafy.backend.model.response.BaseResponseBody;
import com.ssafy.backend.model.response.MessageResponse;
import com.ssafy.backend.service.SessionService;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.OpenViduRole;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/session")
public class SessionController {
    // URL where our OpenVidu server is listening
    @Value("${response.success}")
    private String successMsg;

    @Value("${response.fail}")
    private String failMsg;

    private final SessionService sessionService;

    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }


    /**
     * 방 만들고 입장하기.
     */
    @PostMapping("/{idx}")
    public ResponseEntity<MessageResponse> createAndEnterSession(@PathVariable("idx") String boardIdx) throws OpenViduJavaClientException, OpenViduHttpException {
        // 방을 만든다. API보낸다. 방 없으면 만들고, 토큰 리턴받는다.
        long sessionIdx = Long.parseLong(boardIdx);
        sessionService.createSession(sessionIdx);
        String token = sessionService.enterSession(sessionIdx, OpenViduRole.PUBLISHER);
        return ResponseEntity.status(200).body(MessageResponse.of(200, successMsg, token));
    }

    /**
     * 세션별 인원수 API -수정해야함-
     * 추후 DB 컬럼 수정 후 DB에서 관리할 것
     */
//    @GetMapping("/participant")
//    public ResponseEntity<JSONObject> getNumberofParticipant() throws OpenViduJavaClientException, OpenViduHttpException {
//        this.openVidu.fetch();
//        JSONArray jsonArray = new JSONArray();
//        for (Session session : this.openVidu.getActiveSessions()) {
//            JSONObject json = new JSONObject();
//            json.put("sessionId", session.getSessionId());
//            json.put("numberOfPartcipants", session.getConnections().size());
//            jsonArray.add(json);
//        }
//        JSONObject ret = new JSONObject();
//        ret.put("sessions", jsonArray);
//        return new ResponseEntity<>(ret, HttpStatus.OK);
//    }

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
//    @PostMapping("/exit")
//    public ResponseEntity<BaseResponseBody> exitParticipant(@RequestBody Map<String, Object> sessionNameToken) {
//        String sessionId = (String) sessionNameToken.get("sessionId");
//        String userToken = (String) sessionNameToken.get("userToken");
//        if (this.mapSessions.get(sessionId) != null && this.mapSessionNamesTokens.get(sessionId) != null) {
//
//
//        } else {
//
//        }
//        return ResponseEntity.status(200).body(BaseResponseBody.of(200, successMsg));
//    }

    @GetMapping("/test3")
    public ResponseEntity<JSONObject> testas() throws OpenViduJavaClientException, OpenViduHttpException {

        return new ResponseEntity<>(sessionService.testas(), HttpStatus.OK);
    }
}
