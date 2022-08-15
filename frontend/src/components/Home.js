import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { onAirTopListRequest, getRoomList, roomHitRequest } from "@/services/roomService"
import Loading from "@/components/layout/Loading";
import RoomThumbnail from "@/components/room/RoomThumbnail";
import "@/styles/home.scss"
import { Link } from "react-router-dom";

const Home = () => {
  const state = useSelector(state => state);
  const [onAirTopList, setOnAirTopList] = useState(false);
  const [roomList, setRoomList] = useState([]);
  const [boardList, setBoardList] = useState([]);

  const getOnAirTopList = async () => {
    const result = await onAirTopListRequest();
    if (result?.data?.message === 'success') {
      setOnAirTopList(result.data.list);
    } else {
      console.log(result);
    }
  }

  useEffect(() => {
    getOnAirTopList();
    getRooms(1);
    // getBoards(1);
  }, []);


  const getRooms = async (pageNum) => {
    const result = await getRoomList(pageNum);
    if (result?.data?.message === 'success') {
      setRoomList(result.data.list.slice(0, 5));
    } else {
      console.log(result);
    };
  };

  const getBoards = async (pageNum) => {
    // const result = await getBoardList(pageNum);
    // if (result?.data?.message === 'success') {
    //   setBoardList(result.data.list.slice(0, 5));
    // } else {
    //   console.log(result);
    // };
  };

  const roomHit = async (roomIdx) => {
    roomHitRequest(roomIdx);
  }

  const boardHit = async (boardIdx) => {
    // boardHitRequest(boardIdx);
  }

  return (
    <div className={`main-content ${state.user.auth === '0' ? "user-no-auth" : null}`}>
      <div className="main-content-top">
        <div className="main-content-title">
          <div className="block-box">
            <div className="content">
              <h2>ON AIR</h2>
              <h2>ON AIR</h2>
            </div>
          </div>
        </div>
        <div className="main-on-air-list">
          {onAirTopList ? onAirTopList.map((room, idx) =>
            <RoomThumbnail key={idx} room={room} direction={'v'} />)
            : <Loading />}
        </div>
      </div>

      <div className="main-content-bottom">

        <div className="main-content-bottom-left">
          <div className="block-box">
            <div className="content-disabled">
              <h2>옥상</h2>
              <h2>옥상</h2>
            </div>
          </div>
          {roomList.map((room, idx) => (
            <Link to={`../../room/${room.idx}`} onClick={() => roomHit(`${room.idx}`)} key={idx} >
              <div className='main-content-item'>
                <span className="main-content-item-title">{room.title}</span>
                <span className="main-content-item-info">{room.createDate.slice(0, 10)}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="main-content-bottom-right">
          <div className="block-box">
            <div className="content-disabled">
              <h2>자유게시판</h2>
              <h2>자유게시판</h2>
            </div>
          </div>
          {boardList.map((board, idx) => (
            <Link to={`../../board/${board.idx}`} onClick={() => boardHit(`${board.idx}`)} key={idx} >
              <div className='main-content-item'>
                <span className="main-content-item-title">{board.title}</span>
                <span className="main-content-item-info">{board.createDate.slice(0, 10)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;
