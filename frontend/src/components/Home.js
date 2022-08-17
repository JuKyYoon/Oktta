import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { onAirTopListRequest, getRoomList, roomHitRequest } from "@/services/roomService"
import { getBoardList } from "@/services/boardService"
import Loading from "@/components/layout/Loading";
import RoomThumbnail from "@/components/room/RoomThumbnail";
import "@/styles/home.scss"
import { Link } from "react-router-dom";

const Home = () => {
  const user = useSelector(state => state.user);
  const [onAirTopList, setOnAirTopList] = useState([]);
  const [onAirTopListStatus, setOnAirTopListStatus] = useState(false);
  const [roomList, setRoomList] = useState([]);
  const [roomListStatus, setRoomListStatus] = useState(false);
  const [boardList, setBoardList] = useState([]);
  const [boardListStatus, setBoardListStatus] = useState(false);

  const getOnAirTopList = async () => {
    const result = await onAirTopListRequest();
    setOnAirTopListStatus(true);
    if (result?.data?.message === 'success') {
      setOnAirTopList(result.data.list);
    } else {
      console.log(result);
    }
  }

  useEffect(() => {
    getOnAirTopList();
    getRooms(1);
    getBoards(1);
  }, []);


  const getRooms = async (pageNum) => {
    const result = await getRoomList(pageNum);
    setRoomListStatus(true);
    if (result?.data?.message === 'success') {
      setRoomList(result.data.list.slice(0, 5));
    } else {
      console.log(result);
    };
  };

  const getBoards = async (pageNum) => {
    const result = await getBoardList(pageNum);
    setBoardListStatus(true);
    if (result?.data?.message === 'success') {
      setBoardList(result.data.list.slice(0, 5));
    } else {
      console.log(result);
    };
  };

  const roomHit = async (roomIdx) => {
    if (user.isLogin) {
      roomHitRequest(roomIdx);
    }
  }

  const boardHit = async (boardIdx) => {
    // boardHitRequest(boardIdx);
  }

  return (
    <div className={`main-content ${user.auth === '0' ? "user-no-auth" : null}`}>
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
          {onAirTopListStatus ? onAirTopList.length > 0 ? onAirTopList.map((room, idx) =>
            <RoomThumbnail key={idx} room={room} direction={'v'} />)
              : <div className='no-on-air'>
                  진행중인 라이브가 없습니다.
                </div>
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
          {roomListStatus ? roomList.length > 0 ? roomList.map((room, idx) => (
            <Link to={`${user.isLogin ? `../../room/${room.idx}` : '/user/login'}`} onClick={() => roomHit(`${room.idx}`)} key={idx} >
              <div className='main-content-item'>
                <span className="main-content-item-title">{room.title}</span>
                <span className="main-content-item-info">{room.createDate.slice(0, 10)}</span>
              </div>
            </Link>
          )) :
          <div className='no-on-air'>
            생성된 옥상이 없습니다.
          </div>
          : <Loading />}
        </div>

        <div className="main-content-bottom-right">
          <div className="block-box">
            <div className="content-disabled">
              <h2>자유게시판</h2>
              <h2>자유게시판</h2>
            </div>
          </div>
          {boardListStatus ? boardList.length > 0 ? boardList.map((board, idx) => (
            <Link to={`${user.isLogin ? `../../board/${board.idx}` : '/user/login'}`} onClick={() => boardHit(`${board.idx}`)} key={idx} >
              <div className='main-content-item'>
                <span className="main-content-item-title">{board.title}</span>
                <span className="main-content-item-info">{board.createDate.slice(0, 10)}</span>
              </div>
            </Link>
          )):
          <div className='no-on-air'>
            게시글이 없습니다.
          </div>
          : <Loading />}
        </div>
      </div>

    </div>
  );
};

export default Home;
