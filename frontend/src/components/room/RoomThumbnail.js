import React, { useEffect, useState } from "react";
import { championKorean } from "@/const/lolKorean";
import { useNavigate } from "react-router";

const RoomThumbnail = ({ direction, room }) => {
  const navigate = useNavigate();
  const [winTeam, setWinTeam] = useState('');
  useEffect(() => {
    setWinTeam(room.matchDto.participants.find((participant) => participant.teamId === 100).win ? 'left' : 'right');
  }, []);

  return (
    <div
      className={`${direction === 'v' ? 'thumbnail-vertical' : 'thumbnail-horizontal'}`}
      onClick={() => window.location.replace(`/room/${room.idx}/share`)}
    >
      <div className='thumbnail-box'>
        <div
          className={`thumbnail-team ${winTeam === 'left' ? 'win' : 'lose'}`}
        >
          {room.matchDto.participants
            .filter((participant) => participant.teamId === 100)
            .map((participant, idx) =>
              <div className='thumbnail-participant' key={idx}>
                <div className='thumbnail-participant-data'>
                  <div className='thumbnail-participant-text'>
                    {championKorean[participant.championName]}
                  </div>
                  <div className='thumbnail-participant-kda'>
                    {participant.kills} / {participant.deaths} / {participant.assists}
                  </div>
                </div>
                <img                  
                  src={`/assets/champion/${participant.championName}.png`}
                  className='thumbnail-champion-image'
                />
              </div>
            )}
        </div>
        <div className={`thumbnail-vs win-${winTeam}`}>
          VS
        </div>
        <div
          className={`thumbnail-team ${winTeam === 'right' ? 'win' : 'lose'}`}
        >
          {room.matchDto.participants
            .filter((participant) => participant.teamId === 200)
            .map((participant, idx) =>
              <div className='thumbnail-participant' key={idx}>
                <img
                  key={idx}
                  src={`/assets/champion/${participant.championName}.png`}
                  className='thumbnail-champion-image'
                />
                <div className='thumbnail-participant-data'>
                  <div className='thumbnail-participant-text'>
                    {championKorean[participant.championName]}
                  </div>
                  <div className='thumbnail-participant-kda'>
                    {participant.kills} / {participant.deaths} / {participant.assists}
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
      <div className='thumbnail-content'>
        <div className='thumbnail-info'>
          {direction === 'v' ? <img src={room.profileImage} className='thumbnail-profile-image' /> : null}
          <div className='thumbnail-info-h'>
            <div className='thumbnail-title'>{room.title}</div>
            <div className='thumbnail-user'>
              {direction === 'h' ? <img src={room.profileImage} className='thumbnail-profile-image' /> : null}
              <span className='thumbnail-nickname'>{room.nickname}</span>
            </div>
            {direction === 'h' ?
              <div className='thumbnail-bottom'>
                <img src={`/assets/lol_tier_250/${parseInt(room.tier/10)}.webp`} className='thumbnail-tier-image' />
                <div className='thumbnail-bottom-right'>
                  <p className='thumbnail-people'>{room.people}명 시청중</p>
                </div>
              </div>
            : null}
          </div>
        </div>
        <div className='thumbnail-onair'>
          <div className='thumbnail-onair-icon'></div><p className='thumbnail-onair-text'>N AIR</p>
        </div>
      </div>
    </div>
  );
};

export default RoomThumbnail;
