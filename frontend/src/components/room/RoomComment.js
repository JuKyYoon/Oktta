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

const RoomComment = ({ idx }) => {
  const [commentList, setCommentList] = useState([]);
  const [content, setContent] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [editInput, setEditInput] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const user = useSelector((state) => state.user);

  const getDetailRoom = async (idx) => {
    const result = await detailRoom(idx);

    if (result?.data?.message === 'success') {
      setTotalComments(result.data.commentList.length);
      setCommentList([...result.data.commentList.slice(0, currentPage * 5)]);
      setTotalPage(Math.ceil(result.data.commentList.length / 5));
    };
  };

  useEffect(() => {
    getDetailRoom(idx);

  }, [currentPage, totalPage, totalComments, isEditMode]);

  const submit = async () => {
    const body = { content };
    const result = await createRoomComment(idx, body)
    if (result?.data?.message === 'success') {
      setTotalComments((curr) => curr + 1);
      setContent('');
      alert('댓글 작성 완료!');
    } else {
      setContent('');
      alert('댓글작성에 실패하였습니다.');
    };
  };

  const edit = async () => {
    const body = { content: editInput };
    const result = await editRoomComment(currentIdx, body);
    if (result?.data?.message === 'success') {
      setIsEditMode(false);
      setCurrentIdx(-1);
      setEditInput('');
      alert('댓글 수정 완료');
    } else {
      setIsEditMode(false);
      setCurrentIdx(-1);
      setEditInput('');
      alert('댓글 수정 실패');
    };
  };

  const handleDeleteButton = async (commentIdx) => {
    const result = await deleteRoomComment(commentIdx);
    if (result?.data?.message === 'success') {
      setTotalComments((curr) => curr - 1);
      alert('댓글 삭제 완료');
    } else {
      alert('댓글 삭제 실패');
    };
  };

  const handleToggleEdit = (idx, input) => {
    setCurrentIdx(idx);
    setIsEditMode(true);
    setEditInput(input);
  };
  
  const cancel = () => {
    setIsEditMode(false);
    setCurrentIdx(-1);
    setEditInput('');
  };

  return (
    <div className='comments-wrapper'>
      <h2 className='comment-title'>{`댓글 (${totalComments})`}</h2>
      <div className='comments-header'>
        <div>
          <TextField
            className='comments-header-textarea'
            maxRows={3}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            value={content}
            multiline
            placeholder='댓글을 입력해주세요✏️'
          />
          {content !== '' ? (
            <Button
              sx={{ ml: 2 }}
              variant='outlined'
              onClick={submit}
              color='veryperi'>
              등록하기
            </Button>
          ) : (
            <Button
              sx={{ ml: 2 }}
              variant='outlined'
              disabled={true}
              size='large'
              color='veryperi'>
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

              {currentIdx === comment.idx ? (
                <div>
                  <TextField
                    className='comments-edit-textarea'
                    maxRows={3}
                    onChange={(e) => {
                      setEditInput(e.target.value);
                    }}
                    value={editInput}
                    multiline
                    placeholder='댓글을 입력해주세요✏️'
                  />
                  {editInput !== '' ? (
                    <Button
                      sx={{ ml: 1, mr: 1 }}
                      variant='outlined'
                      onClick={edit}
                      color='veryperi'>
                      수정하기
                    </Button>
                  ) : (
                    <Button
                      sx={{ ml: 1, mr: 1 }}
                      variant='outlined'
                      disabled={true}
                      color='veryperi'>
                      수정하기
                    </Button>
                  )}
                  <Button
                    sx={{ ml: 1, mr: 1 }}
                    variant='outlined'
                    onClick={cancel}
                    color='veryperi'>
                    취소
                  </Button>
                  <hr></hr>
                </div>
              ) : (
                <div>
                  <div className='comment-content'>{comment.content}</div>
                  <div className='comment-username'>
                    {comment.nickname === user.nickname ? (
                      <Button
                        sx={{ m: 1 }}
                        variant='outlined'
                        onClick={() => handleDeleteButton(comment.idx)}
                        color='veryperi'>
                        삭제
                      </Button>
                    ) : null}
                    {comment.nickname === user.nickname ? (
                      <Button
                        sx={{ m: 1 }}
                        variant='outlined'
                        onClick={() =>
                          handleToggleEdit(comment.idx, comment.content)
                        }
                        color='veryperi'>
                        수정
                      </Button>
                    ) : null}

                    {comment.nickname}
                  </div>
                  <hr />
                </div>
              )}
            </div>
          ))}
        </div>
        {currentPage < totalPage && (
          <div
            className='comments-footer'
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}>
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
