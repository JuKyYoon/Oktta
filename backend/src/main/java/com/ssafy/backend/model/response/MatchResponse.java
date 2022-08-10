package com.ssafy.backend.model.response;

import com.ssafy.backend.model.dto.lol.MatchDto;
import org.json.simple.JSONObject;

import java.util.List;

public class MatchResponse extends BaseResponseBody {
    List<String> matchList;

    public List<String> getMatchList() {
        return matchList;
    }

    public void setMatchList(List<String> matchList) {
        this.matchList = matchList;
    }

    public static MatchResponse of(Integer statusCode, String message, List<String> matchList){
        MatchResponse res = new MatchResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setMatchList(matchList);
        return res;
    }

}
