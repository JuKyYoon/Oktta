package com.ssafy.backend.service;

import com.ssafy.backend.model.entity.LolAuth;
import org.springframework.stereotype.Service;

@Service
public class LOLServiceImpl implements LOLService {

    private final String URL = "https://kr.api.riotgames.com";
    private final String API_KEY = "RGAPI-19caeffa-aa50-43f4-97ce-311b3fb8056e";
    @Override
    public LolAuth getUserInfo(String summonerName) {
        String url = URL + "/lol/summoner/v4/summoners/by-name/" + summonerName + "?api_key=" + API_KEY;

        return null;
    }
}
