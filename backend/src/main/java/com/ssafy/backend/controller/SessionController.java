package com.ssafy.backend.controller;

import com.ssafy.backend.model.dto.SessionEventDto;
import com.ssafy.backend.model.entity.Room;
import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.exception.UserNotFoundException;
import com.ssafy.backend.model.repository.UserRepository;
import com.ssafy.backend.model.response.BaseResponseBody;
import com.ssafy.backend.model.response.MessageResponse;
import com.ssafy.backend.model.response.RecordingResponse;
import com.ssafy.backend.model.response.SessionEnterResponse;
import com.ssafy.backend.service.SessionService;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.OpenViduRole;
import io.openvidu.java.client.Recording;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.io.*;
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

    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }


    /**
     * 방 만들고 입장하기.
     */
    @PostMapping("/{idx}")
    public ResponseEntity<SessionEnterResponse> createAndEnterSession(@PathVariable("idx") Long sessionIdx)
            throws OpenViduJavaClientException, OpenViduHttpException {
        // 방을 만든다. API보낸다. 방 없으면 만들고, 토큰 리턴받는다.
        System.out.println("enter and create session");

        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Room room = sessionService.getSessionRoom(sessionIdx);
        boolean isOwner = sessionService.checkSessionOwner(principal.getUsername(), room);

        synchronized (SessionController.class) {
            if(isOwner) {
                sessionService.createSession(principal.getUsername(), sessionIdx, room);
                String token = sessionService.enterSession(principal.getUsername(), sessionIdx, OpenViduRole.MODERATOR);
                return ResponseEntity.status(200).body(SessionEnterResponse.of(200, "owner", token, room.getTitle()));
            } else {
                String token = sessionService.enterSession(principal.getUsername(), sessionIdx, OpenViduRole.PUBLISHER);
                return ResponseEntity.status(200).body(SessionEnterResponse.of(200, "participant", token, room.getTitle()));
            }
        }
    }

    /**
     * 방 퇴장
     */
//    @DeleteMapping("/{idx}")
//    public ResponseEntity<MessageResponse> leaveSession(@PathVariable("idx") String boardIdx, @RequestBody Map<String, String> body){
//
//        long sessionIdx = Long.parseLong(boardIdx);
//        System.out.println("asdf");
//        String token = body.get("token");
//        System.out.println(token);
//        synchronized (SessionController.class) {
////            sessionService.leaveSession(sessionIdx, token);
//            System.out.println("delete session");
//            return ResponseEntity.status(200).body(MessageResponse.of(200, successMsg, token));
//        }
//    }

    /**
     * 세션 입장
     * @param sessionIdx
     */
    @GetMapping("/{idx}")
    public ResponseEntity<MessageResponse> enterSession(@PathVariable("idx") Long sessionIdx) throws OpenViduJavaClientException, OpenViduHttpException {
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        System.out.println("enter session");
        String token = sessionService.enterSession(principal.getUsername(), sessionIdx, OpenViduRole.PUBLISHER);
        return ResponseEntity.status(200).body(MessageResponse.of(200, successMsg, token));
    }

    /**
     * 세션 닫기
     */
    @DeleteMapping("/{idx}")
    public ResponseEntity<BaseResponseBody> closeSession(@PathVariable("idx") Long sessionIdx) throws OpenViduJavaClientException, OpenViduHttpException {
        System.out.println("session close!!!!!!!!!!!!!");
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Room room = sessionService.getSessionRoom(sessionIdx);
        boolean isOwner = sessionService.checkSessionOwner(principal.getUsername(), room);

        if(isOwner) {
            sessionService.closeSession(sessionIdx);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, successMsg));
        } else {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, failMsg));
        }
    }

    @GetMapping("/test1")
    public ResponseEntity<JSONObject> testaaaaasdf() throws OpenViduJavaClientException, OpenViduHttpException {
        return new ResponseEntity<>(sessionService.connectionPrint(), HttpStatus.OK);
    }



    /**
     * 현재 모든 Session에 대한 정보 최신으로 가져옴
     */
    @GetMapping("")
    public ResponseEntity<JSONObject> getSessions(@RequestParam(name="type") String type) throws OpenViduJavaClientException, OpenViduHttpException {
        if("openvidu".equals(type)) {
            return new ResponseEntity<>(sessionService.getSessionsFromOpenVidu(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(sessionService.getSessionsFromJava(), HttpStatus.OK);
        }
    }

    /**
     * 초기화
     */
    @GetMapping("/clear")
    public ResponseEntity<String> clearSession() throws OpenViduJavaClientException, OpenViduHttpException {
        sessionService.clearSession();
        return new ResponseEntity<>("200", HttpStatus.OK);
    }

    /**
     * Webhook
     * @param req
     * @return
     * @throws IOException
     */
    @PostMapping("/callback")
    public ResponseEntity<String> openviduWebhook(@RequestBody SessionEventDto dto)  {
        try {
            System.out.println("--------------------------------");
            if(dto.getReason() != null) {
                if(dto.getConnection() != null) {
                    System.out.println("webrtcConnectionDestroyed");
                    if("OUTBOUND".equals(dto.getConnection())) {
                        System.out.printf("%s , 나 자신의 WebRTC 연결을 끊음\n", dto.getConnectionId());
                    } else {
                        System.out.printf("%s는 ??? 로부터 받은 WebRTC 연결이 끊어짐\n", dto.getConnectionId());
                    }
                } else {
                    if(dto.getConnectionId() != null) {
                        System.out.println("participantLeft");
                        System.out.printf("%s 가 떠남요\n", dto.getServerData());
                        System.out.printf("%s 가 떠남요\n", dto.getclientData());

                        JSONParser parser = new JSONParser();
                        Object obj = parser.parse( dto.getServerData() );
                        JSONObject jsonObj = (JSONObject) obj;
                        String idx = (String) jsonObj.get("idx");
                        String nickname = (String) jsonObj.get("nickname");

                        jsonObj = (JSONObject) parser.parse( dto.getclientData() );
                        jsonObj = (JSONObject) jsonObj.get("clientData");
                        String token = (String) jsonObj.get("token");

                        synchronized (SessionController.class) {
                            sessionService.leaveSession(Long.parseLong(idx), token, nickname);
                        }


                    } else {
                        System.out.println("sessionDestroyed");
                        System.out.printf("%s 세션이 아래 이유로 종료\n", dto.getSessionId());
                        System.out.println(dto.getReason());
                    }
                }

            } else {
                if(dto.getConnection() != null) {
                    System.out.println("webrtcConnectionCreated");
                    if("OUTBOUND".equals(dto.getConnection())) {
                        System.out.printf("%s , 나 자신의 WebRTC연결을 Publish 한다\n", dto.getConnectionId());
                    } else {
                        System.out.printf("%s는 ???의 WebRTC 연결을 받는다.\n", dto.getConnectionId());
                    }
                } else {
                    if(dto.getConnectionId() != null) {
                        System.out.println("participantJoined");
                        System.out.printf("%s 가 들어옴\n", dto.getServerData());
                    } else {
                        System.out.println("sessionCreated");
                        System.out.printf("%s 세션이 만들어짐\n", dto.getSessionId());
                    }
                }
            }
            System.out.println("--------------------------------");
        } catch (Exception e){
            e.printStackTrace();
        }

        return new ResponseEntity<>("200", HttpStatus.OK);
    }

    /**
     * @param roomIdx
     * JSON 형식: "sessionId" : sessionId
     * @return
     */
    @PostMapping("/recording/start/{idx}")
    public ResponseEntity<? extends BaseResponseBody> startRecording(@PathVariable("idx") Long roomIdx, @RequestBody Map<String, Object> params) {
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println("<------------ 녹화 시작 ------------>");

        Map<Boolean, Recording> map = sessionService.recordingStart(principal.getUsername(), roomIdx, params);
        if(map.containsKey(false)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(BaseResponseBody.of(403, failMsg));
        }

        Recording result = map.get(true);
        if(result != null) {
            return ResponseEntity.status(200).body(RecordingResponse.of(200, successMsg, result));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(BaseResponseBody.of(400, failMsg));
        }
    }

    /**
     * @param roomIdx
     * JSON 형식: "recording" : recordingId
     * recordingId는 start에서 return받은 JSON 중 recordingProperties의 name 값.
     * @return
     */
    @PostMapping("/recording/stop/{idx}")
    public ResponseEntity<? extends BaseResponseBody> stopRecording(@PathVariable("idx") Long roomIdx, @RequestBody Map<String, Object> params){
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println("<------------ 녹화 중단 ------------>");
        
        Map<Boolean, Recording> map = sessionService.recordingStop(principal.getUsername(), roomIdx, params);
        if(map.containsKey(false)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(BaseResponseBody.of(403, failMsg));
        }

        Recording result = map.get(true);
        if(result != null) {
            return ResponseEntity.status(200).body(RecordingResponse.of(200, successMsg, result));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(BaseResponseBody.of(400, failMsg));
        }
    }
}
