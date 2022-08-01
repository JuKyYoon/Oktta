package com.ssafy.backend.controller;

import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.repository.UserRepository;
import com.ssafy.backend.model.response.BaseResponseBody;
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

@RestController
@RequestMapping("/lol")
public class LOLController {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @Value("${response.success}")
    private String successMsg;

    @Value("${response.fail}")
    private String failMsg;

    private final UserRepository userRepository;


    public LOLController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     *
     */
    @PostMapping()
    public ResponseEntity<BaseResponseBody> tier(@RequestBody String summonerName){
        UserDetails principal =  (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(principal.getUsername()).orElse(null);
        if(user!=null){
            return  ResponseEntity.status(200).body(BaseResponseBody.of(200,"null"));
        }else{
            LOGGER.info("tier auth start");

            return  ResponseEntity.status(200).body(BaseResponseBody.of(200,successMsg));
        }
    }
}
