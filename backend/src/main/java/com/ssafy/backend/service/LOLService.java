package com.ssafy.backend.service;

import com.ssafy.backend.model.entity.LolAuth;

public interface LOLService {
    LolAuth getUserInfo(String summonerName);
}
