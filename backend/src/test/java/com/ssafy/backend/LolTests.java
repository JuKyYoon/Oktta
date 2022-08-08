package com.ssafy.backend;

import com.ssafy.backend.model.dto.LolInfoDto;
import com.ssafy.backend.model.dto.lol.InfoDto;
import com.ssafy.backend.service.LOLService;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@ExtendWith(SpringExtension.class)
@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class LolTests {

    @Autowired
    LOLService lolService;

//    @Test
    public void getUserTierInfo(){
        String summonerName = "cs포기요";
        LolInfoDto response = lolService.getTierInfo(summonerName).blockFirst();
        System.out.println(summonerName + ":" + response.getTier() +" " + response.getRank());
    }

//    @Test
    public void getUserInfo(){
        String summonerName = "cs포기요";
        LolInfoDto response = lolService.getUserInfo(summonerName).block();
        System.out.println(response.getId());
//        System.out.println(response);
//        response.map((data) -> {
//            if(data != null){
//                System.out.println(data);
//                return ResponseEntity.ok().header("data","true").build();
//            }
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
//        });
    }

    @Test
    public void getGames(){
        String summonerName = "cs포기요";
        String summonerId = lolService.getUserInfo(summonerName).block().getPuuid();
        ArrayList<String> result = lolService.getRecentGames(summonerId).block();
        System.out.println(result);
        for(String matchId : result){
            InfoDto infoDto = lolService.getGameDetails(matchId);
            System.out.println(infoDto);
        }
    }
}
