package com.ssafy.backend.model.response;

import java.util.List;

public class VideoResponse extends BaseResponseBody {
    List<String> videos;

    public List<String> getVideos() {
        return videos;
    }

    public void setVideos(List<String> videos) {
        this.videos = videos;
    }

    public static VideoResponse of(Integer statusCode, String message, List<String> videos) {
        VideoResponse res = new VideoResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setVideos(videos);
        return res;
    }
}
