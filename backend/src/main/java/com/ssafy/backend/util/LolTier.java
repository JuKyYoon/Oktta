package com.ssafy.backend.util;

public class LolTier {

    private LolTier(){}
    public static int getTier(String tier, String rank) {
        tier = tier.toUpperCase();
        int result = 0;
        if(tier != null){
            switch (tier){
                case "IRON":
                    result += 10;
                    break;
                case "BRONZE":
                    result += 20;
                    break;
                case "SILVER":
                    result += 30;
                    break;
                case "GOLD":
                    result += 40;
                    break;
                case "PLATINUM":
                    result += 50;
                    break;
                case "DIAMOND":
                    result += 60;
                    break;
                case "MASTER":
                    result = 70;
                    break;
                case "GRANDMASTER":
                    result = 80;
                    break;
                case "CHALLENGER":
                    result = 90;
                    break;
                default:
                    result -= 100;
                    break;
            }
            if(rank != null){
                switch (rank){
                    case "IV":
                        result += 1;
                        break;
                    case "III":
                        result += 2;
                        break;
                    case "II":
                        result += 3;
                        break;
                    case "I":
                        result += 4;
                        break;
                }
            }
        }
        return result;
    }
}
