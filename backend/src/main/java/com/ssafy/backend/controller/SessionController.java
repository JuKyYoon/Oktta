package com.ssafy.backend.controller;

import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.exception.UserNotFoundException;
import com.ssafy.backend.model.repository.UserRepository;
import com.ssafy.backend.model.response.MessageResponse;
import com.ssafy.backend.service.SessionService;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.OpenViduRole;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/session")
public class SessionController {
    // URL where our OpenVidu server is listening
    @Value("${response.success}")
    private String successMsg;

    @Value("${response.fail}")
    private String failMsg;

    private final SessionService sessionService;

    private final UserRepository userRepository;

    public SessionController(SessionService sessionService, UserRepository userRepository) {
        this.sessionService = sessionService;
        this.userRepository = userRepository;
    }


    /**
     * 방 만들고 입장하기.
     */
    @PostMapping("/{idx}")
    public ResponseEntity<MessageResponse> createAndEnterSession(@PathVariable("idx") String boardIdx)
            throws OpenViduJavaClientException, OpenViduHttpException {
        // 방을 만든다. API보낸다. 방 없으면 만들고, 토큰 리턴받는다.
        System.out.println("enter and create session");

        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(principal.getUsername()).orElseThrow(
                () -> new UserNotFoundException("User Not Found")
        );

        long sessionIdx = Long.parseLong(boardIdx);
        synchronized (SessionController.class) {
            sessionService.createSession(user.getId(), sessionIdx);
            String token = sessionService.enterSession(user, sessionIdx, OpenViduRole.MODERATOR);
            return ResponseEntity.status(200).body(MessageResponse.of(200, successMsg, token));
        }
    }

    /**
     * 방 퇴장
     */
    @DeleteMapping("/{idx}")
    public ResponseEntity<MessageResponse> leaveSession(@PathVariable("idx") String boardIdx, @RequestBody Map<String, String> body){

        long sessionIdx = Long.parseLong(boardIdx);
        System.out.println("asdf");
        String token = body.get("token");
        System.out.println(token);
        synchronized (SessionController.class) {
            sessionService.leaveSession(sessionIdx, token);
            System.out.println("delete session");
            return ResponseEntity.status(200).body(MessageResponse.of(200, successMsg, token));
        }
    }

    /**
     * 세션 입장
     * @param boardIdx
     */
    @GetMapping("/{idx}")
    public ResponseEntity<MessageResponse> enterSession(@PathVariable("idx") String boardIdx) throws OpenViduJavaClientException, OpenViduHttpException {
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(principal.getUsername()).orElseThrow(
                () -> new UserNotFoundException("User Not Found")
        );


        System.out.println("enter session");
        long sessionIdx = Long.parseLong(boardIdx);


        String token = sessionService.enterSession(user, sessionIdx, OpenViduRole.PUBLISHER);
        return ResponseEntity.status(200).body(MessageResponse.of(200, successMsg, token));

    }

    @GetMapping("/test1")
    public ResponseEntity<JSONObject> testaaaaasdf() throws OpenViduJavaClientException, OpenViduHttpException {
        return new ResponseEntity<>(sessionService.connectionPrint(), HttpStatus.OK);
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
