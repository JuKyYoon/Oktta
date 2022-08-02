package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.LolInfoDto;
import com.ssafy.backend.model.entity.LolAuth;
import com.ssafy.backend.model.repository.LolAuthRepository;
import com.ssafy.backend.util.LolTier;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class LOLServiceImpl implements LOLService {

    private static final Logger LOGGER = LoggerFactory.getLogger(LOLServiceImpl.class);
    private final WebClient webClient;
    private final LolAuthRepository lolAuthRepository;

    @Value("${riot.api-key}")
    private String apiKey;

    public LOLServiceImpl(WebClient webClient, @Value("${riot.url}") String riotUrl, LolAuthRepository lolAuthRepository) {
        this.lolAuthRepository = lolAuthRepository;
        this.webClient = webClient.mutate().baseUrl(riotUrl).build();
    }

    @Override
    public Flux<LolInfoDto> getTierInfo(String summonerId) {
        return webClient.get().uri(uriBuilder -> uriBuilder
                .path("/lol/league/v4/entries/by-summoner/" + summonerId)
                .queryParam("api_key", apiKey)
                .build())
                .retrieve().bodyToFlux(LolInfoDto.class);
    }

    @Override
    public Mono<LolInfoDto> getUserInfo(String summonerName) {
        return webClient.get().uri(uriBuilder -> uriBuilder
                        .path("/lol/summoner/v4/summoners/by-name/" + summonerName)
                        .queryParam("api_key", apiKey)
                        .build())
                .retrieve().bodyToMono(LolInfoDto.class);
    }

    @Override
    public boolean createLolAuth(String userId, String summonerName) {
        LOGGER.info("getUserInfo start");
        try{
            LolInfoDto userInfo = getUserInfo(summonerName).block();
            LOGGER.info("getTierInfo start");
            LolInfoDto tierInfo = getTierInfo(userInfo.getId()).blockFirst();
            int tier = 0;
            if(tierInfo != null){
                tier = LolTier.getTier(tierInfo.getTier(), tierInfo.getRank());
            }
            LolAuth lolAuth = new LolAuth.Builder(userId, userInfo.getPuuid(),
                    tier, userInfo.getId(), userInfo.getName()).build();
            lolAuthRepository.save(lolAuth);
            return true;
        }catch (WebClientResponseException e){
            LOGGER.error(e.getMessage());
            return false;
        }

    }
}
