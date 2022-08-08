package com.ssafy.backend.util;


import com.ssafy.backend.model.entity.ProviderType;

public class SnsType {

    private SnsType(){}

    public static ProviderType getSnsType(int type){
        ProviderType result;
        switch (type){
            case 1:
                result = ProviderType.GOOGLE;
                break;
            case 2:
                result = ProviderType.NAVER;
                break;
            case 3:
                result = ProviderType.KAKAO;
                break;
            default:
                result = ProviderType.LOCAL;
                break;
        }
        return result;
    }

    public static int getIntSnsType(ProviderType type){
        switch (type){
            case GOOGLE:
                return 1;
            case NAVER:
                return 2;
            case KAKAO:
                return 3;
            case LOCAL:
            default:
                return 0;
        }
    }
}
