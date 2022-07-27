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
        synchronized (SessionController.class) {
            sessionService.createSession(sessionIdx);
            String token = sessionService.enterSession(sessionIdx, OpenViduRole.PUBLISHER);
            return ResponseEntity.status(200).body(MessageResponse.of(200, successMsg, token));
        }


    }

    /**
     * 세션 입장
     * @param boardIdx
     */
    @GetMapping("/{idx}")
    public ResponseEntity<MessageResponse> enterSession(@PathVariable("idx") String boardIdx) throws OpenViduJavaClientException, OpenViduHttpException {
        long sessionIdx = Long.parseLong(boardIdx);
        String token = sessionService.enterSession(sessionIdx, OpenViduRole.SUBSCRIBER);
        return ResponseEntity.status(200).body(MessageResponse.of(200, successMsg, token));
    }

    @GetMapping("/test2")
    public ResponseEntity<JSONObject> testaasdf() throws OpenViduJavaClientException, OpenViduHttpException {
        return new ResponseEntity<>(sessionService.twotwotwo(), HttpStatus.OK);
    }

    /**
     * 현재 모든 Session에 대한 정보 최신으로 가져옴
     */
    @GetMapping("/test3")
    public ResponseEntity<JSONObject> testas() throws OpenViduJavaClientException, OpenViduHttpException {

        return new ResponseEntity<>(sessionService.testas(), HttpStatus.OK);
    }
}
