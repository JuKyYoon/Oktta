package com.ssafy.backend.model.response;

import com.ssafy.backend.model.dto.lol.MatchDto;

import java.util.List;

public class MatchResponse extends BaseResponseBody {
    List<MatchDto> matchList;

    public List<MatchDto> getMatchList() {
        return matchList;
    }

    public void setMatchList(List<MatchDto> matchList) {
        this.matchList = matchList;
    }

    public static MatchResponse of(Integer statusCode, String message, List<MatchDto> matchList){
        MatchResponse res = new MatchResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setMatchList(matchList);
        return res;
    }
}
