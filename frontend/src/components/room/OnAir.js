import React, { useEffect, useState } from "react";
import RoomThumbnail from "./RoomThumbnail";
import { onAirListRequest } from "@/services/roomService";
import Loading from "../layout/Loading";
import { useNavigate } from "react-router";
import { Pagination } from "@mui/material";

const OnAir = () => {
  const [onAirList, setOnAirList] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  const getOnAirList = async (pageNum) => {
    const result = await onAirListRequest(pageNum);
    if (result?.data?.message === 'success') {
      setOnAirList(result.data.list);
      setLastPage(result.data.lastPage);
    } else {
      console.log(result);
    }
  }

  const onChangeHandler = (event, page) => {
    setCurrentPage(page);
    getOnAirList(page);
  };

  useEffect(() => {
    getOnAirList(1);
  }, [])

  return (
    <div className='on-air-list'>
      {onAirList ?
        onAirList.length > 0 ? onAirList.map((room, idx) =>
          <RoomThumbnail key={idx} room={room} direction={'h'} />
        )
        : <div className='no-on-air'>
          진행중인 라이브가 없습니다.
        </div>
      : <Loading />}
      <Pagination
        count={lastPage}
        page={currentPage}
        showFirstButton
        showLastButton
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default OnAir;
