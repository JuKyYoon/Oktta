package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.LolInfoDto;
import com.ssafy.backend.model.dto.lol.MatchDto;
import com.ssafy.backend.model.entity.LolAuth;
import org.json.simple.JSONObject;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.Map;

public interface LOLService {
    Flux<LolInfoDto> getTierInfo(String summonerName);
    Mono<LolInfoDto> getUserInfo(String summonerName);
    int createLolAuth(String userId, String summonerName);
    Mono<ArrayList> getRecentGames(String summonerId, int start);

    LolAuth getUserLolAuth(String userId);

//    MatchDto getGameDetails(String matchId, MatchDto matchDto);

//    JSONObject getGmaeDetailsTest(String matchId);
}
