import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { onAirTopListRequest } from "@/services/roomService"
import Loading from "@/components/layout/Loading";
import RoomThumbnail from "@/components/room/RoomThumbnail";
import "@/styles/home.scss"

const Home = () => {
  const state = useSelector(state => state);
  const [onAirTopList, setOnAirTopList] = useState(false);

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
  }, []);

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
        </div>

        <div className="main-content-bottom-right">
          <div className="block-box">
            <div className="content-disabled">
              <h2>자유게시판</h2>
              <h2>자유게시판</h2>
            </div>
          </div>
        </div>
      </div>   
      
    </div>
  );
};

export default Home;
