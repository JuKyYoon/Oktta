import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, TextField, Pagination } from '@mui/material';
import {
  detailRoom,
  createRoomComment,
  deleteRoomComment,
  editRoomComment,
} from '../../services/roomService';
import '../../styles/room.scss';

const RoomComment = ({ idx }) => {
  // 댓글 리스트
  const [commentList, setCommentList] = useState([]);
  // 페이지네이션 마지막 페이지
  const [lastPage, setLastPage] = useState(0);

  // 현재 보고 있는 댓글 페이지
  const [currentPage, setCurrentPage] = useState(1);

  // 댓글 생성 내용
  const [content, setContent] = useState('');

  // 이거 왜 필요함 ?
  const [totalComments, setTotalComments] = useState(0);

  // 현재 수정할려고 하는 댓글 idx
  const [currentIdx, setCurrentIdx] = useState(-1);

  // 댓글 수정 값
  const [editInput, setEditInput] = useState('');

  // 댓글 토글 되게하는 값
  const [isEditMode, setIsEditMode] = useState(false);

  // 리렌더하기위함
  const [reRender, setRerender] = useState(0);

  // 현재 로그인한 유저 정보
  const user = useSelector((state) => state.user);

  const getDetailRoom = async (idx) => {
    const result = await detailRoom(idx);

    if (result?.data?.message === 'success') {
      // console.log(result);
      setCommentList(result.data.list);
      setLastPage(Math.ceil(result.data.list.length / 5));
    }
  };

  useEffect(() => {
    getDetailRoom(idx);
  }, []);

  const submit = async () => {
    const body = { content };

    const result = await createRoomComment(idx, body);
    if (result?.data?.message === 'success') {
      // setCommentList([...commentList, content]);
      setContent('');
      alert('댓글 작성 완료!');
    } else {
      setContent('');
      alert('댓글작성에 실패하였습니다.');
    }
  };

  const edit = async () => {
    const body = { content: editInput };
    const result = await editRoomComment(currentIdx, body);
    setIsEditMode(false);
    setCurrentIdx(-1);
    setEditInput('');
    if (result?.data?.message === 'success') {
      alert('댓글 수정 완료');
    } else {
      alert('댓글 수정 실패');
    }
  };

  const handleDeleteButton = async (commentIdx) => {
    const result = await deleteRoomComment(commentIdx);
    if (result?.data?.message === 'success') {
      alert('댓글 삭제 완료');
    } else {
      alert('댓글 삭제 실패');
    }
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
  const onChangeHandler = (event, page) => setCurrentPage(page);

  return (
    <div className='comments-wrapper'>
      <h2 className='comment-title'>댓글</h2>
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
              size='large'
              color='veryperi'
            >
              등록하기
            </Button>
          ) : (
            <Button
              sx={{ ml: 2 }}
              variant='outlined'
              disabled={true}
              size='large'
              color='veryperi'
            >
              등록하기
            </Button>
          )}
        </div>
        <div className='comments-body'>
          {commentList.map((comment, index) => {
            if (
              6 * (currentPage - 1) <= index &&
              index < 5 + 6 * (currentPage - 1)
            ) {
              return (
                <div key={comment.idx} className='comments-comment'>
                  <div className='comment-date'>{comment.createTime}</div>

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
                          color='veryperi'
                        >
                          수정하기
                        </Button>
                      ) : (
                        <Button
                          sx={{ ml: 1, mr: 1 }}
                          variant='outlined'
                          disabled={true}
                          color='veryperi'
                        >
                          수정하기
                        </Button>
                      )}
                      <Button
                        sx={{ ml: 1, mr: 1 }}
                        variant='outlined'
                        onClick={cancel}
                        color='veryperi'
                      >
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
                            color='veryperi'
                          >
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
                            color='veryperi'
                          >
                            수정
                          </Button>
                        ) : null}

                        {comment.nickname}
                      </div>
                      <hr />
                    </div>
                  )}
                </div>
              );
            }
          })}
        </div>
        <Pagination
          count={lastPage}
          page={currentPage}
          showFirstButton
          showLastButton
          onChange={onChangeHandler}
        />
      </div>
    </div>
  );
};

export default RoomComment;
