package com.ssafy.backend.model.mapper;

import com.ssafy.backend.model.dto.lol.MatchDto;
import com.ssafy.backend.model.dto.lol.ParticipantDto;
import com.ssafy.backend.model.entity.Match;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
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
        matchDto.setGameMode(match.getGameMode());
        List<ParticipantDto> participants = new ArrayList<>();
        String[] participantIds = match.getParticipantId().split(PREFIX);
        String[] teamIds = match.getTeamId().split(PREFIX);
        String[] championIds = match.getChampionId().split(PREFIX);
        String[] championNames = match.getChampionName().split(PREFIX);
        String[] summonerIds = match.getSummonerId().split(PREFIX);
        String[] summonerNames = match.getSummonerName().split(PREFIX);
        String[] teamPositions = match.getTeamPosition().split(PREFIX);
        String[] kill = match.getKill().split(PREFIX);
        String[] assist = match.getAssist().split(PREFIX);
        String[] death = match.getDeath().split(PREFIX);
        String[] puuid = match.getPuuid().split(PREFIX);
        String[] win = match.getWin().split(PREFIX);
        for(int i = 0; i < participantIds.length; i++){
            ParticipantDto participantDto = new ParticipantDto();
            participantDto.setParticipantId(Integer.parseInt(participantIds[i]));
            participantDto.setTeamId(Integer.parseInt(teamIds[i]));
            participantDto.setChampionId(Integer.parseInt(championIds[i]));
            participantDto.setChampionName(championNames[i]);
            participantDto.setSummonerId(summonerIds[i]);
            participantDto.setSummonerName(summonerNames[i]);
            if(match.getGameMode().equals("CLASSIC")) {
                participantDto.setTeamPosition(teamPositions[i]);
            }
            participantDto.setKills(Integer.parseInt(kill[i]));
            participantDto.setAssists(Integer.parseInt(assist[i]));
            participantDto.setDeaths(Integer.parseInt(death[i]));
            participantDto.setPuuid(puuid[i]);
            participantDto.setWin(win[i].equals("true") ? true : false);
            participants.add(participantDto);
        }
        matchDto.setMatchRank(match.getMatchTier());
        matchDto.setParticipants(participants);
        return matchDto;
    }
    public Match dtoToEntity(MatchDto matchDto){
        StringBuilder participantId = new StringBuilder();
        StringBuilder teamId = new StringBuilder();
        StringBuilder summonerId = new StringBuilder();
        StringBuilder summonerName = new StringBuilder();
        StringBuilder teamPosition = new StringBuilder();
        StringBuilder championId = new StringBuilder();
        StringBuilder championName = new StringBuilder();
        StringBuilder kill = new StringBuilder();
        StringBuilder assist = new StringBuilder();
        StringBuilder death = new StringBuilder();
        StringBuilder puuid = new StringBuilder();
        StringBuilder win = new StringBuilder();
        LocalDateTime matchDate =
                LocalDateTime.ofInstant(Instant.ofEpochMilli(matchDto.getGameStartTimestamp()),
                        TimeZone.getDefault().toZoneId());

        List<ParticipantDto> participants = matchDto.getParticipants();
        System.out.println(participants);
        for(ParticipantDto participant : participants){
            participantId.append(participant.getParticipantId()).append(PREFIX);
            teamId.append(participant.getTeamId()).append(PREFIX);
            summonerId.append(participant.getSummonerId()).append(PREFIX);
            summonerName.append(participant.getSummonerName()).append(PREFIX);
            if(participant.getTeamPosition() != null){
                teamPosition.append(participant.getTeamPosition()).append(PREFIX);
            }
            championId.append(participant.getChampionId()).append(PREFIX);
            championName.append(participant.getChampionName()).append(PREFIX);
            kill.append(participant.getKills()).append(PREFIX);
            assist.append(participant.getAssists()).append(PREFIX);
            death.append(participant.getDeaths()).append(PREFIX);
            puuid.append(participant.getPuuid()).append(PREFIX);
            win.append(participant.isWin() ? "true" : "false").append(PREFIX);
        }
        participantId.setLength(participantId.length()-1);
        teamId.setLength(teamId.length()-1);
        summonerId.setLength(summonerId.length()-1);
        summonerName.setLength(summonerName.length()-1);
        championId.setLength(championId.length()-1);
        championName.setLength(championName.length()-1);
        if(teamPosition.length() > 0){
            teamPosition.setLength(teamPosition.length()-1);
        }
        kill.setLength(kill.length()-1);
        assist.setLength(assist.length()-1);
        death.setLength(death.length()-1);
        puuid.setLength(puuid.length()-1);
        win.setLength(win.length()-1);
        Match match =
                new Match.Builder(participantId.toString(), matchDto.getGameMode(), teamId.toString(), matchDto.getMatchId(), championId.toString(),
                        championName.toString(), summonerId.toString(),
                        summonerName.toString(), matchDate.withNano(0),
                        matchDto.getMatchRank(), kill.toString(), assist.toString(),
                        death.toString(), puuid.toString(),
                        win.toString(), teamPosition.toString()).build();
        return match;
    }
}
