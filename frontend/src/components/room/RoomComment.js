import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, TextField } from '@mui/material';

import {
  detailRoom,
  createRoomComment,
  deleteRoomComment,
  editRoomComment,
} from '../../services/roomService';
import '../../styles/room.scss';
import { set } from 'lodash';

const RoomComment = ({ idx }) => {
  const [commentList, setCommentList] = useState([]);
  const [content, setContent] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    detailRoom(idx)
      .then((res) => {
        setTotalComments(res.data.commentList.length);
        setCommentList([...res.data.commentList.slice(0, currentPage * 5)]);
        setTotalPage(Math.ceil(res.data.commentList.length / 5));
      })
      .catch((err) => console.log(err));
  }, [currentPage, totalPage, totalComments]);

  // 마지막 페이지 수
  // setTotalPage(Math.ceil(commentList.length / 5));

  const submit = () => {
    const body = { content: content };
    createRoomComment(idx, body)
      .then((res) => {
        setContent('');
        alert('댓글 작성 완료!');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteButton = (commentIdx) => {
    deleteRoomComment(commentIdx)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  // const handleEditButton = (commentIdx) => {
  //   editRoomComment(commentIdx, body)
  //     .then((res) => {
  //       console.log(res);
  //       window.location.reload();
  //     })
  //     .catch((err) => console.log(err));
  // };
  return (
    <div className='comments-wrapper'>
      <h3>{`댓글목록 ${totalComments}`}</h3>
      <div className='comments-header'>
        <div>
          <TextField
            className='comments-header-textarea'
            maxRows={3}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            multiline
            placeholder='댓글을 입력해주세요✏️'
          />
          {content !== '' ? (
            <Button variant='outlined' onClick={submit} color='veryperi'>
              등록하기
            </Button>
          ) : (
            <Button variant='outlined' disabled={true} color='veryperi'>
              등록하기
            </Button>
          )}
        </div>

        <div className='comments-body'>
          {commentList.map((comment) => (
            <div key={comment.idx} className='comments-comment'>
              <div className='comment-date'>
                {comment.createTime.substr(0, 10)}
              </div>
              <div className='comment-content'>{comment.content}</div>
              <div className='comment-username'>
                {comment.nickname === user.nickname ? (
                  <Button
                    variant='outlined'
                    onClick={() => handleDeleteButton(comment.idx)}
                    color='veryperi'
                  >
                    삭제
                  </Button>
                ) : null}
                {/* {comment.nickname === user.nickname ? (
                  <Button
                    variant='outlined'
                    onClick={() => handleEditButton(comment.idx)}
                    color='veryperi'
                  >
                    수정
                  </Button>
                ) : null} */}

                {comment.nickname}
              </div>
              <hr />
            </div>
          ))}
        </div>
        {currentPage < totalPage && (
          <div
            className='comments-footer'
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
          >
            <Button variant='outlined' color='veryperi'>
              댓글 더보기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomComment;
