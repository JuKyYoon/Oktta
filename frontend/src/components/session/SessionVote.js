import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { detailRoom } from "../../services/roomService";
import { createVote, deleteVote } from "../../services/voteService";
import "@ckeditor/ckeditor5-build-classic/build/translations/ko";
import VoteChart from "@/components/room/VoteChart";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import "@/styles/room.scss";
import { championKorean } from "@/const/lolKorean";

const SessionVote = (props) => {
  const { idx, closeVote } = props;
  const [room, setRoom] = useState(null);
  const [vote, setVote] = useState(0);
  const [voteDto, setVoteDto] = useState(null);
  const [currentVote, setCurrentVote] = useState("");
  const [candidates, setCandidates] = useState([]);
  // 댓글 정보
  const getDetailRoom = async (idx) => {
    const result = await detailRoom(idx);
    if (result?.data?.message !== "success") {
      // navigate("../list");
      return ;

    }

    // 투표가 종료된 방이면 voteDto값 설정해주기
    const rawData = result?.data?.result;
    if (rawData.voteDto) {
      setVoteDto(rawData.voteDto);
    }
    // 방 정보 room에 저장
    setRoom(rawData);
    console.log(rawData);
    // 댓글 정보
    const participants = rawData.matchDto.participants;
    const candidateList = participants.filter(
      (participant) => participant.teamId === parseInt(rawData.hostTeamId)
    );
    setCandidates([...candidateList]);
    if (rawData.myVote !== 0) {
      setCurrentVote(
        championKorean[candidateList[rawData.myVote - 1].championName]
      );
    }
  };

  const handleVoteChanged = (event) => {
    setVote(parseInt(event.target.value));
  };

  const onVoteButtonClicked = async () => {
    const result = await createVote(idx, vote);
    if (result?.data?.message === "success") {
      setCurrentVote(
        championKorean[candidates[parseInt(vote) - 1].championName]
      );
      alert("투표하였습니다.");
      closeVote();
    } else {
      alert("투표에 실패하였습니다...");
    }
    setVote(0);
  };

  const onVoteCancelButtonClicked = async () => {
    const result = await deleteVote(idx);
    if (result?.data?.message === "success") {
      setCurrentVote("");

      alert("투표를 철회하였습니다.");
      closeVote()
    } else if (result?.data?.message === "fail") {
      alert("먼저 투표를 해주세요!");
    }
    setVote(0);
  };

  useEffect(() => {
    getDetailRoom(idx);

    return () => {
      console.log("close modal");
    }
  }, []);


  return (
    <>
      {room !== null ? (
        <>
          {voteDto && candidates.length ? (
            <VoteChart
              top={voteDto.first}
              jungle={voteDto.second}
              mid={voteDto.third}
              adc={voteDto.fourth}
              supporter={voteDto.fifth}
              candidates={candidates}
            />
        )  : (<div className="vote-box">
        <div>
          <h3 className="vote-modal-h3-title">투표가 진행중입니다!</h3>
          <div className="current-vote">
            {currentVote === ""
              ? "투표를 진행해주세요"
              : `현재 투표한 챔피언: ${currentVote}`}
          </div>
        </div>
        <div className="vote-component">
          <div className="vote-component-left">
            <img
              src="../assets/donut_chart.png"
              className="donut-chart"
              alt="도넛차트"
            />
          </div>
          <div className="vote-component-right">
            <h3>범인 고르기</h3>
            <FormControl sx={{ width: "50px", margin: "0" }}>
              <RadioGroup
                value={vote}
                className="team-select-radio-group"
                onChange={handleVoteChanged}
              >
                {candidates.map((candidate, idx) => (
                  <FormControlLabel
                    value={idx + 1}
                    key={idx}
                    control={<Radio />}
                    label={
                      <>
                        <div className="vote-candidate-box">
                          <img
                            src={`/assets/champion/${candidate.championName}.png`}
                            width="40px"
                            height="auto"
                            style={{ marginRight: "5px" }}
                          />
                          <p style={{ whiteSpace: "nowrap", height: "auto" }}>
                            {championKorean[candidate.championName]}
                          </p>
                        </div>
                      </>
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className="vote-box-bottom">
          <Button
            className="detail-button"
            size="small"
            variant="outlined"
            color="veryperi"
            onClick={onVoteButtonClicked}
            disabled={vote === 0 ? true : false}
          >
            투표하기
          </Button>
          <Button
            className="detail-button"
            size="small"
            variant="outlined"
            color="veryperi"
            onClick={onVoteCancelButtonClicked}
          >
            투표철회
          </Button>
        </div>
      </div>)} </> ) : (<div>에러입니다.</div>) }
    </>
  );
};

export default SessionVote;
