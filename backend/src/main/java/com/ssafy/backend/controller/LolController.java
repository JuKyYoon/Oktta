package com.ssafy.backend.controller;

import com.google.gson.Gson;
import com.ssafy.backend.model.dto.LolInfoDto;
import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.exception.UserNotFoundException;
import com.ssafy.backend.model.repository.UserRepository;
import com.ssafy.backend.model.response.BaseResponseBody;
import com.ssafy.backend.model.response.MatchResponse;
import com.ssafy.backend.model.response.MessageResponse;
import com.ssafy.backend.service.LOLService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/lol")
public class LolController {
    private static final Logger LOGGER = LoggerFactory.getLogger(LolController.class);

    @Value("${response.success}")
    private String successMsg;

    @Value("${response.fail}")
    private String failMsg;

    private final LOLService lolService;


    public LolController(LOLService lolService) {
        this.lolService = lolService;
    }

    /**
     * 소환사 명으로 티어정보 저장
     * @param summonerMap { summonerName }
     * @return { statusCode, message }
     */
    @PostMapping("")
    public ResponseEntity<MessageResponse> tier(@RequestBody Map<String, String> summonerMap) {
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        int result = lolService.createLolAuth(principal.getUsername(), summonerMap.get("summonerName"));
        if(result == 1){
            return ResponseEntity.status(200).body(MessageResponse.of(200,successMsg, "success"));
        } else if (result == -1 ) {
            return ResponseEntity.status(200).body(MessageResponse.of(200,failMsg, "server error"));
        } else if (result == 0 ) {
            return ResponseEntity.status(200).body(MessageResponse.of(200,failMsg, "already"));
        } else{
            return ResponseEntity.status(200).body(MessageResponse.of(200,failMsg, ""));
        }
    }

    /**
     * 소환사 명으로 최근 게임 정보 반환
     * @param summonerName
     * @return
     */

    @GetMapping("/match/{summonerName}")
    public ResponseEntity<BaseResponseBody> getRecentGames(@PathVariable("summonerName") String summonerName, @RequestParam("page") String page){
        LolInfoDto userInfo = lolService.getUserInfo(summonerName).block();
        String puuid = userInfo.getPuuid();
        List<String> matchIdList = lolService.getRecentGames(puuid, Integer.parseInt(page) * 10).block();
        return ResponseEntity.status(200).body(MatchResponse.of(200, successMsg, matchIdList));


//        String summonerId = userInfo.getId();
//        LolInfoDto tierInfo = lolService.getTierInfo(summonerId).blockFirst();
//        int rank = 0;
//        if(tierInfo != null){
//            rank = LolTier.getTier(tierInfo.getTier(), tierInfo.getRank());
//        }
//        List<MatchDto> recentGames = new ArrayList<>();
//        for(String matchId : matchIdList){
//            MatchDto matchDto = new MatchDto();
//            matchDto.setMatchRank(rank);
//            recentGames.add(lolService.getGameDetails(matchId, matchDto));
//        }
//        if(recentGames.size() == 0){
//            return  ResponseEntity.status(204).body(BaseResponseBody.of(204, failMsg));
//        }

    }
}
