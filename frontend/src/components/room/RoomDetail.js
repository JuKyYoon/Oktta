import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import { deleteRoom, detailRoom } from '../../services/roomService';
import { Button } from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '../../util/build/ckeditor';
import '@ckeditor/ckeditor5-build-classic/build/translations/ko';
import '../../styles/room.scss';
import { useSelector } from 'react-redux';

const RoomDetail = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const { idx } = useParams();
  const [room, setRoom] = useState({});

  useEffect(() => {
    detailRoom(idx)
      .then((res) => {
        setRoom(res.data.result);
      })
      .catch((err) => console.log(err));
  }, []);

  const onDeleteButtonClicked = () => {
    deleteRoom(idx)
      .then((res) => {
        if (res.data.message === 'success') {
          navigate('../list');
        }
      })
      .catch((err) => console.log(err));
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
        {room.nickname === user.nickname ? (
          <Link to={`../edit/${room.idx}`} style={{ textDecoration: 'none' }}>
            <Button variant='outlined' color='veryperi'>
              수정하기
            </Button>
          </Link>
        ) : null}
        {room.nickname === user.nickname ? (
          <Button
            variant='contained'
            color='veryperi'
            onClick={onDeleteButtonClicked}>
            방 삭제하기
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default RoomDetail;
