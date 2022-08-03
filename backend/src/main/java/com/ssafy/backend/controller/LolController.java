package com.ssafy.backend.controller;

import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.exception.UserNotFoundException;
import com.ssafy.backend.model.repository.UserRepository;
import com.ssafy.backend.model.response.BaseResponseBody;
import com.ssafy.backend.service.LOLService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/lol")
public class LolController {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @Value("${response.success}")
    private String successMsg;

    @Value("${response.fail}")
    private String failMsg;

    private final UserRepository userRepository;
    private final LOLService lolService;


    public LolController(UserRepository userRepository, LOLService lolService) {
        this.userRepository = userRepository;
        this.lolService = lolService;
    }

    /**
     * 소환사 명으로 티어정보 저장
     * @param summonerMap { summonerName }
     * @return { statusCode, message }
     */
    @PostMapping("")
    public ResponseEntity<BaseResponseBody> tier(@RequestBody Map<String, String> summonerMap) {
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(principal.getUsername()).orElseThrow(
                () -> new UserNotFoundException("User Not Found")
        );
        boolean result = lolService.createLolAuth(user.getId(), summonerMap.get("summonerName"));
        if(result){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200,successMsg));
        }else{
            return ResponseEntity.status(200).body(BaseResponseBody.of(200,failMsg));
        }
    }
}
