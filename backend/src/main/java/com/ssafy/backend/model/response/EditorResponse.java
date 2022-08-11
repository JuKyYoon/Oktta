package com.ssafy.backend.model.response;

public class EditorResponse{
    String url;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public static EditorResponse of(String url){
        EditorResponse res = new EditorResponse();
        res.setUrl(url);
        return res;
    }
}