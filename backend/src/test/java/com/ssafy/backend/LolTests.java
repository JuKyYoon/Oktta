package com.ssafy.backend;

import com.ssafy.backend.model.dto.LolInfoDto;
import com.ssafy.backend.model.entity.LolAuth;
import com.ssafy.backend.service.LOLService;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import reactor.core.publisher.Mono;

import static org.junit.jupiter.api.Assertions.assertNotNull;

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
}
