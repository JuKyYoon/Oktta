import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, TextField, Pagination } from '@mui/material';
import {
  createBoardComment,
  deleteBoardComment,
  editBoardComment,
} from '@/services/boardService';
import '@/styles/board.scss';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

const BoardComment = ({ idx, list }) => {

  dayjs.extend(utc);
  const dateFormat = (date) => {
    if (date == undefined) {
      date = dayjs.utc().local();
    } else {
    date = dayjs.utc(date).local();
}
    return date.format('YYYY-MM-DD HH: mm');

  };

  // 댓글 리스트
  const [commentList, setCommentList] = useState([]);

  // 페이지네이션 마지막 페이지
  const [lastPage, setLastPage] = useState(1);

  // 현재 보고 있는 댓글 페이지
  const [currentPage, setCurrentPage] = useState(1);

  // 댓글 생성 내용
  const [content, setContent] = useState('');
  const [lastIdx, setLastIdx] = useState(0);

  // 현재 수정할려고 하는 댓글 idx
  const [currentIdx, setCurrentIdx] = useState(-1);

  // 댓글 수정 값
  const [editInput, setEditInput] = useState('');

  // 댓글 토글 되게하는 값
  const [isEditMode, setIsEditMode] = useState(false);

  // 현재 로그인한 유저 정보
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setCommentList([...list]);
    if (list.length != 0) {
      setLastIdx(list[list.length - 1].idx);
      setLastPage(Math.ceil(list.length / 5));
    }
  }, [list]);

  const commentSubmit = async () => {
    const body = { content: content.trim() };

    const result = await createBoardComment(idx, body);
    if (result?.data?.message === 'success') {
      const nickname = user.nickname;
      setLastIdx((curr) => curr + 1);
      if (lastIdx === 0) {
        location.reload();
      }
      const commentIdx = lastIdx + 1;
      const createTime = dateFormat();

      const newComment = {
        idx: commentIdx,
        createTime,
        nickname,
        content: content.trim(),
      };
      setCommentList([...commentList, newComment]);
      setContent('');
      if (commentList.length / 5 >= lastPage) {
        setLastPage((curr) => curr + 1);
        setCurrentPage((curr) => curr + 1);
      }
      if (currentPage < lastPage) setCurrentPage(lastPage);
      alert('댓글 작성 완료!');
    } else {
      setContent('');
      alert('댓글작성에 실패하였습니다.');
    }
  };

  const commentEdit = async () => {
    const body = { content: editInput.trim() };
    if (body.content.length < 2) {
      return;
    }
    const result = await editBoardComment(currentIdx, body);

    setIsEditMode(false);
    setCurrentIdx(-1);
    setEditInput('');
    if (result?.data?.message === 'success') {
      alert('댓글 수정 완료');

      setCommentList((commentList) =>
        commentList.map((item) =>
          item.idx == currentIdx ? { ...item, content: body.content } : item
        )
      );
    } else {
      alert('댓글 수정 실패');
    }
  };

  const handleDeleteButton = async (commentIdx) => {
    const result = await deleteBoardComment(commentIdx);
    if (result?.data?.message === 'success') {
      setCommentList(
        commentList.filter((comment) => comment.idx !== commentIdx)
      );

      if (lastPage != 1 && commentList.length / 5 < lastPage) {
        setLastPage((curr) => curr - 1);
        setCurrentPage((curr) => curr - 1);
      }
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
      <h2 className='comment-title'>댓글 {commentList.length}</h2>
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
          <Button
            sx={{ ml: 2 }}
            variant='outlined'
            onClick={commentSubmit}
            disabled={content.trim().length < 2}
            size='large'
            color='veryperi'>
            등록하기
          </Button>
        </div>
        <div className='comments-body'>
          {commentList.map((comment, index) => {
            if (
              5 * (currentPage - 1) <= index &&
              index < 5 + 5 * (currentPage - 1)
            ) {
              return (
                <div key={comment.idx} className='comments-comment'>
                  <div className='comment-date'>
                    {dateFormat(comment.createTime)}
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
                      <Button
                        sx={{ ml: 1, mr: 1 }}
                        variant='outlined'
                        onClick={commentEdit}
                        disabled={editInput.trim().length < 2}
                        color='veryperi'>
                        수정하기
                      </Button>
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
                          <>
                            <Button
                              sx={{ m: 1 }}
                              variant='outlined'
                              onClick={() => handleDeleteButton(comment.idx)}
                              color='veryperi'>
                              삭제
                            </Button>
                            <Button
                              sx={{ m: 1 }}
                              variant='outlined'
                              onClick={() =>
                                handleToggleEdit(comment.idx, comment.content)
                              }
                              color='veryperi'>
                              수정
                            </Button>
                          </>
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

export default BoardComment;
