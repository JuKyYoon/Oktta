package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.LolInfoDto;
import com.ssafy.backend.model.dto.lol.InfoDto;
import com.ssafy.backend.model.dto.lol.ParticipantDto;
import com.ssafy.backend.model.entity.LolAuth;
import com.ssafy.backend.model.repository.LolAuthRepository;
import com.ssafy.backend.util.LolTier;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Set;

@Service
public class LOLServiceImpl implements LOLService {

    private static final Logger LOGGER = LoggerFactory.getLogger(LOLServiceImpl.class);
    private final WebClient webClient;
    private final WebClient asiaWebClinet;
    private final LolAuthRepository lolAuthRepository;

    @Value("${riot.api-key}")
    private String apiKey;

    public LOLServiceImpl(WebClient webClient, @Value("${riot.url}") String riotUrl,
                          @Value("${riot.asia-url}") String riotAsiaUrl, WebClient asiaWebClinet, LolAuthRepository lolAuthRepository) {
        this.lolAuthRepository = lolAuthRepository;
        this.webClient = webClient.mutate().baseUrl(riotUrl).build();
        this.asiaWebClinet = asiaWebClinet.mutate().baseUrl(riotAsiaUrl).build();
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

    @Override
    public Mono<ArrayList> getRecentGames(String puuid) {
        return asiaWebClinet.get().uri(uriBuilder -> uriBuilder
                        .path("/lol/match/v5/matches/by-puuid/" + puuid + "/ids")
                        .queryParam("count",10)
                        .queryParam("api_key", apiKey)
                        .build())
                .retrieve().bodyToMono(ArrayList.class);
    }

    @Override
    public InfoDto getGameDetails(String matchId) {
        JSONObject jsonObject = asiaWebClinet.get().uri(uriBuilder -> uriBuilder
                        .path("/lol/match/v5/matches/" + matchId)
                        .queryParam("api_key", apiKey)
                        .build())
                .retrieve().bodyToMono(JSONObject.class).block();
        LinkedHashMap<String, Object> lhm = (LinkedHashMap<String, Object>) jsonObject.get("info");
        Set<String> keys = lhm.keySet();
        InfoDto infoDto = new InfoDto();
        infoDto.setGameMode(lhm.get("gameMode").toString());
        infoDto.setGameStartTimestamp(Long.parseLong(lhm.get("gameStartTimestamp").toString()));
        infoDto.setMapId(Integer.parseInt(lhm.get("mapId").toString()));
        System.out.println(infoDto);
        List<ParticipantDto> participants = new ArrayList<>();

        for(ParticipantDto participant : (List<ParticipantDto>) lhm.get("participants")){
            participants.add(participant);
        }
//        System.out.println(participants);
        // printing the elements of LinkedHashMap
//        for (String key : keys) {
//            System.out.println(key + " -- "
//                    + lhm.get(key));
//        }
//        InfoDto infoDto = (InfoDto) Objects.requireNonNull(jsonObject).get("info");
//        return infoDto;
        return null;
    }


}
