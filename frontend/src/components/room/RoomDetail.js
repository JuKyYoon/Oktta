import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteRoom, detailRoom } from '../../services/roomService';
import { Navigate, useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '../../util/build/ckeditor';
import '@ckeditor/ckeditor5-build-classic/build/translations/ko';
import '../../styles/room.scss';

const RoomDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [room, setRoom] = useState({});
  console.log('나는 왜 2번 호출 되는가...??');
  useEffect(() => {
    dispatch(detailRoom(roomId))
      .then((res) => {
        setRoom(res.payload.data.result);
      })
      .catch((err) => console.log(err));
  }, []);

  const onDeleteButtonClicked = () => {
    dispatch(deleteRoom(roomId)).then((res) => {
      console.log(res);
      if (res.payload.data.message === 'success') {
        navigate('../list');
      }
    });
  };

  return (
    <div className='room'>
      <div className='detail-component'>
        <h3>게시글 상세보기</h3>
        <hr className='hrLine'></hr>
        <div>
          <h1>{room.title}</h1>
          <CKEditor
            editor={ClassicEditor}
            config={{
              language: 'ko',
            }}
            data={room.content}
            onReady={(editor) => {
              editor.enableReadOnlyMode('my-feature-id');
              editor.ui.view.toolbar.element.style.display = 'none';
            }}
          />
        </div>
      </div>
      <div>
        <Link to={`../list`} style={{ textDecoration: 'none' }}>
          <Button variant='outlined' color='veryperi'>
            목록으로
          </Button>
        </Link>
        <Link to={`../edit/${room.idx}`} style={{ textDecoration: 'none' }}>
          <Button variant='outlined' color='veryperi'>
            수정하기
          </Button>
        </Link>
        <Button
          variant='contained'
          color='veryperi'
          onClick={onDeleteButtonClicked}>
          방 삭제하기
        </Button>
      </div>
    </div>
  );
};

export default RoomDetail;
