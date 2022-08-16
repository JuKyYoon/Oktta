package com.ssafy.backend.model.response;

import io.openvidu.java.client.Recording;

public class RecordingResponse extends BaseResponseBody {
    Recording recording;

    public Recording getRecording() {
        return recording;
    }

    public void setRecording(Recording recording) {
        this.recording = recording;
    }

    public static RecordingResponse of(Integer statusCode, String message, Recording recording){
        RecordingResponse res = new RecordingResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setRecording(recording);
        return res;
    }
}
