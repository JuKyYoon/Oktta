package com.ssafy.backend.service;

import com.ssafy.backend.model.dto.LolInfoDto;
import com.ssafy.backend.model.dto.lol.MatchDto;
import com.ssafy.backend.model.dto.lol.ParticipantDto;
import com.ssafy.backend.model.entity.LolAuth;
import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.exception.UserNotFoundException;
import com.ssafy.backend.model.repository.LolAuthRepository;
import com.ssafy.backend.model.repository.UserRepository;
import com.ssafy.backend.util.LolTier;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

@Service
public class LOLServiceImpl implements LOLService {

    private static final Logger LOGGER = LoggerFactory.getLogger(LOLServiceImpl.class);
    private final WebClient webClient;
    private final WebClient asiaWebClinet;
    private final LolAuthRepository lolAuthRepository;
    private final UserRepository userRepository;
    @Value("${riot.api-key}")
    private String apiKey;

    @Value("${riot.game-count}")
    private int gameCount;

    public LOLServiceImpl(WebClient webClient, @Value("${riot.url}") String riotUrl,
                          @Value("${riot.asia-url}") String riotAsiaUrl, WebClient asiaWebClinet, LolAuthRepository lolAuthRepository, UserRepository userRepository) {
        this.lolAuthRepository = lolAuthRepository;
        this.webClient = webClient.mutate().baseUrl(riotUrl).build();
        this.asiaWebClinet = asiaWebClinet.mutate().baseUrl(riotAsiaUrl).build();
        this.userRepository = userRepository;
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
    public int createLolAuth(String userId, String summonerName) {

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
            return 1;
        } catch (WebClientResponseException e){
            LOGGER.error(e.getMessage());
            return -1;
        } catch (DataIntegrityViolationException e) {
            LOGGER.error(e.getMessage());
            return 0;
        }
    }

    @Override
    public Mono<ArrayList> getRecentGames(String puuid, int start) {
        return asiaWebClinet.get().uri(uriBuilder -> uriBuilder
                        .path("/lol/match/v5/matches/by-puuid/" + puuid + "/ids")
                        .queryParam("start", start)
                        .queryParam("count", gameCount)
                        .queryParam("api_key", apiKey)
                        .build())
                .retrieve().bodyToMono(ArrayList.class);
    }

    @Override
    public LolAuth getUserLolAuth(String userId) {
        return lolAuthRepository.findByUserId(userId).orElse(null);
    }

//    @Override
//    public MatchDto getGameDetails(String matchId, MatchDto matchDto) {
//        JSONObject jsonObject = asiaWebClinet.get().uri(uriBuilder -> uriBuilder
//                        .path("/lol/match/v5/matches/" + matchId)
//                        .queryParam("api_key", apiKey)
//                        .build())
//                .retrieve().bodyToMono(JSONObject.class).block();
//
//        LinkedHashMap<String, Object> lhm = (LinkedHashMap<String, Object>) jsonObject.get("info");
//        matchDto.setMatchId(matchId);
//        matchDto.setQueueId(Integer.parseInt(lhm.get("queueId").toString()));
//        matchDto.setMapId(Integer.parseInt(lhm.get("mapId").toString()));
//        matchDto.setGameMode(lhm.get("gameMode").toString());
//        matchDto.setGameStartTimestamp(Long.parseLong(lhm.get("gameStartTimestamp").toString()));
//        matchDto.setGameEndTimestamp(Long.parseLong(lhm.get("gameEndTimestamp").toString()));
//        List<ParticipantDto> participants = new ArrayList<>();
//        for(LinkedHashMap<String, Object> participantsMap : (ArrayList<LinkedHashMap<String, Object>>) lhm.get("participants")){
//            ParticipantDto participantDto = new ParticipantDto();
//            participantDto.setParticipantId(Integer.parseInt(participantsMap.get("participantId").toString()));
//            participantDto.setTeamId(Integer.parseInt(participantsMap.get("teamId").toString()));
//            participantDto.setSummonerId(participantsMap.get("summonerId").toString());
//            participantDto.setSummonerName(participantsMap.get("summonerName").toString());
//            participantDto.setTeamPosition(participantsMap.get("teamPosition").toString());
//            participantDto.setChampionId(Integer.parseInt(participantsMap.get("championId").toString()));
//            participantDto.setChampionName(participantsMap.get("championName").toString());
//            participantDto.setKills(Integer.parseInt(participantsMap.get("kills").toString()));
//            participantDto.setDeaths(Integer.parseInt(participantsMap.get("deaths").toString()));
//            participantDto.setAssists(Integer.parseInt(participantsMap.get("assists").toString()));
//            participantDto.setPuuid(participantsMap.get("puuid").toString());
//            participantDto.setWin((Boolean) participantsMap.get("win"));
//            participants.add(participantDto);
//        }
//        matchDto.setParticipants(participants);
//        return matchDto;
//    }


}
