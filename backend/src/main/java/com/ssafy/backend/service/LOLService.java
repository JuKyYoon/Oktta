package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.LolInfoDto;
import com.ssafy.backend.model.dto.lol.MatchDto;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;

public interface LOLService {
    Flux<LolInfoDto> getTierInfo(String summonerName);
    Mono<LolInfoDto> getUserInfo(String summonerName);
    boolean createLolAuth(String userId, String summonerName);
    Mono<ArrayList> getRecentGames(String summonerId);

    MatchDto getGameDetails(String matchId, MatchDto matchDto);
}
