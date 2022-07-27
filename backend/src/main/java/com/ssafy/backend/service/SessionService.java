package com.ssafy.backend.service;

import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.OpenViduRole;
import org.json.simple.JSONObject;

public interface SessionService {
    void createSession(long sessionIdx) throws OpenViduJavaClientException, OpenViduHttpException;
    String enterSession(long sessionIdx, OpenViduRole role) throws OpenViduJavaClientException, OpenViduHttpException;

    JSONObject twotwotwo() throws OpenViduJavaClientException, OpenViduHttpException;
    JSONObject testas() throws OpenViduJavaClientException, OpenViduHttpException;
}
