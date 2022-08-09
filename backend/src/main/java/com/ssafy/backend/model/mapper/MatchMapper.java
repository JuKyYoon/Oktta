package com.ssafy.backend.model.mapper;

import com.ssafy.backend.model.dto.lol.MatchDto;
import com.ssafy.backend.model.dto.lol.ParticipantDto;
import com.ssafy.backend.model.entity.Match;
import net.bytebuddy.build.ToStringPlugin;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.TimeZone;

@Component
public class MatchMapper {

    final String PREFIX = "/";

    public MatchMapper(){ }

    public MatchDto entityToDto(Match match){
        MatchDto matchDto = new MatchDto();
        matchDto.setMatchId(match.getMatchId());
        matchDto.setGameStartTimestamp(match.getMatchDate().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli());
        List<ParticipantDto> participants = new ArrayList<>();
        String[] championIds = match.getChampionId().split(PREFIX);
        String[] championNames = match.getChampionId().split(PREFIX);
        String[] summonerIds = match.getChampionId().split(PREFIX);
        String[] summonerNames = match.getChampionId().split(PREFIX);
        for(int i = 0; i < championIds.length; i++){
            ParticipantDto participantDto = new ParticipantDto();
            participantDto.setChampionId(Integer.parseInt(championIds[i]));
            participantDto.setChampionName(championNames[i]);
            participantDto.setSummonerId(summonerIds[i]);
            participantDto.setSummonerName(summonerNames[i]);
        }
        matchDto.setMatchRank(match.getMatchTier());
        matchDto.setParticipants(participants);
        return matchDto;
    }
    public Match dtoToEntity(MatchDto matchDto){
        // MatchDto to Match
        StringBuilder championId = new StringBuilder();
        StringBuilder championName = new StringBuilder();
        StringBuilder summonerId = new StringBuilder();
        StringBuilder summonerName = new StringBuilder();
        LocalDateTime matchDate =
                LocalDateTime.ofInstant(Instant.ofEpochMilli(matchDto.getGameStartTimestamp()),
                        TimeZone.getDefault().toZoneId());

        List<ParticipantDto> participants = matchDto.getParticipants();
        for(ParticipantDto participant : participants){
            championId.append(participant.getChampionId()).append(PREFIX);
            championName.append(participant.getChampionName()).append(PREFIX);
            summonerId.append(participant.getSummonerId()).append(PREFIX);
            summonerName.append(participant.getSummonerName()).append(PREFIX);
        }
        championId.setLength(championId.length()-1);
        championName.setLength(championName.length()-1);
        summonerId.setLength(summonerId.length()-1);
        summonerName.setLength(summonerName.length()-1);
        Match match =
                new Match.Builder(matchDto.getMatchId(), championId.toString(),
                        championName.toString(), summonerId.toString(), summonerName.toString(), matchDate.withNano(0), matchDto.getMatchRank()).build();
        return match;
    }
}
