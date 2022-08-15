import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import { detailBoard, deleteBoard } from '@/services/boardService';
import { Button, Dialog, DialogContent, IconButton } from '@mui/material';
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '../../util/build/ckeditor';
import '@ckeditor/ckeditor5-build-classic/build/translations/ko';
import { useSelector } from 'react-redux';
import BoardComment from './BoardComment.js';

import '@/styles/board.scss';

const BoardDetail = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const { idx } = useParams();
  const [board, setBoard] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getDetailBoard = async (idx) => {
    const result = await detailBoard(idx);
    if (result?.data?.message !== 'success') {
      alert('잘못된 접근입니다.');
      navigate('../list');
    }

    // 방 정보 board에 저장
    setBoard(result?.data?.boardDto);
  };

  useEffect(() => {
    getDetailBoard(idx);
  }, []);

  const onDeleteButtonClicked = async () => {
    const result = await deleteBoard(idx);
    // 200 성공이면 삭제
    if (result?.data?.message === 'success') {
      navigate('../list');
    } else if (result?.data?.message === 'fail') {
      // 200 실패이면 남의 글 삭제
      alert('잘못된 요청입니다.');
    } else {
      alert('잘못된 요청입니다.');
      // console.log(result?.response?.status);
      navigate('../list');
    }
  };

  return (
    <>
      {board !== null ? (
        <div className='board'>
          <h1>{board.title}</h1>
          <hr className='hrLine'></hr>

          <div className='detail-editor'>
            <CKEditor
              editor={ClassicEditor}
              config={{
                language: 'ko',
              }}
              data={board.content}
              onReady={(editor) => {
                editor.enableReadOnlyMode('my-feature-id');
                editor.ui.view.toolbar.element.style.display = 'none';
              }}
            />
          </div>

          <div>
            <Link to={`../list`} style={{ textDecoration: 'none' }}>
              <Button
                className='detail-button'
                variant='outlined'
                color='veryperi'
              >
                목록으로
              </Button>
            </Link>
            {board.nickname === user.nickname ? (
              <Link
                to={`../edit/${board.idx}`}
                style={{ textDecoration: 'none' }}
              >
                <Button
                  className='detail-button'
                  variant='outlined'
                  color='veryperi'
                >
                  수정하기
                </Button>
              </Link>
            ) : null}

            {board.nickname === user.nickname ? (
              <Button
                className='detail-button'
                variant='contained'
                color='veryperi'
                onClick={() => setShowDeleteModal(true)}
              >
                방 삭제하기
              </Button>
            ) : null}
          </div>
          <hr className='hrLine'></hr>
          {/* 삭제확인모달 */}
          <Dialog open={showDeleteModal}>
            <DialogContent style={{ position: 'relative' }}>
              <IconButton
                style={{ position: 'absolute', top: '0', right: '0' }}
                onClick={() => setShowDeleteModal(false)}
              >
                <DisabledByDefaultOutlinedIcon />
              </IconButton>
              <div className='modal'>
                <div className='modal-title'> 정말 삭제하시겠습니까 ?</div>
                <div className='modal-button'>
                  <Button
                    variant='outlined'
                    color='error'
                    onClick={onDeleteButtonClicked}
                  >
                    예
                  </Button>
                  <Button
                    variant='outlined'
                    color='primary'
                    onClick={() => {
                      setShowDeleteModal(false);
                    }}
                  >
                    아니오
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <BoardComment idx={idx} />
        </div>
      ) : null}{' '}
    </>
  );
};

export default BoardDetail;
