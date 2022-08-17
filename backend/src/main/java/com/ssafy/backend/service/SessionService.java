package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.SessionEventDto;
import com.ssafy.backend.model.entity.Room;
import io.openvidu.java.client.*;
import org.json.simple.JSONObject;

import java.util.List;
import java.util.Map;

public interface SessionService {
    boolean checkSessionOwner(String userId, Room room);
    Room getSessionRoom(long sessionIdx);
    void createSession(String userId, long sessionIdx, Room room) throws OpenViduJavaClientException, OpenViduHttpException;
    String enterSession(String userId, long sessionIdx, OpenViduRole role) throws OpenViduJavaClientException, OpenViduHttpException;
    void leaveSession(long sessionIdx, String token, String nickname);
    void closeSession(long sessionIdx, Room room) throws OpenViduJavaClientException, OpenViduHttpException;
    void increaseRoomPeople(Room room, boolean isOwner);
    JSONObject getSessionsFromOpenVidu() throws OpenViduJavaClientException, OpenViduHttpException;
    JSONObject getSessionsFromJava() throws OpenViduJavaClientException, OpenViduHttpException;
    JSONObject connectionPrint() throws OpenViduJavaClientException, OpenViduHttpException;
    void clearSession();
    Map<Boolean, Recording> recordingStart(String userId, Long roomIdx, Map<String, Object> params);
    Map<Boolean, Recording> recordingStop(String userId, Long roomIdx, Map<String, Object> params);
    boolean saveRecordUrl(Long roomIdx, SessionEventDto dto);
    List<String> getVideos(Long roomIdx);
    Session searchSession(long sessionIdx);
}
