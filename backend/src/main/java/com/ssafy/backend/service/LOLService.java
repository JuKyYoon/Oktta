package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.LolInfoDto;
import com.ssafy.backend.model.entity.LolAuth;
import com.ssafy.backend.model.entity.User;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.UnsupportedEncodingException;

public interface LOLService {
    Flux<LolInfoDto> getTierInfo(String summonerName);
    Mono<LolInfoDto> getUserInfo(String summonerName);

    boolean createLolAuth(String userId, String summonerName);
}
