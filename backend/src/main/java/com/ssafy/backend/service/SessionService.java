package com.ssafy.backend.service;

import com.ssafy.backend.model.entity.User;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.OpenViduRole;
import org.json.simple.JSONObject;

public interface SessionService {
    void createSession(long sessionIdx) throws OpenViduJavaClientException, OpenViduHttpException;
    String enterSession(User user, long sessionIdx, OpenViduRole role) throws OpenViduJavaClientException, OpenViduHttpException;
    void leaveSession(long sessionIdx, String token);

    JSONObject twotwotwo() throws OpenViduJavaClientException, OpenViduHttpException;
    JSONObject testas() throws OpenViduJavaClientException, OpenViduHttpException;
    JSONObject connectionPrint() throws OpenViduJavaClientException, OpenViduHttpException;
}