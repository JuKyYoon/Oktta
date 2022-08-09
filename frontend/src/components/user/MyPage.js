import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Pagination } from '@mui/material';
import '../../styles/user.scss';
import { getProfileRequest } from '../../services/userService';
import EditIcon from '@mui/icons-material/Edit';

const MyPage = () => {
  const nickname = useSelector((state) => state.user.nickname)
  const [mode, setMode] = useState('info');
  const [profile, setProfile] = useState({});
  const alist = ['내가 작성한 글 1', '내가 작성한 글 2', '내가 작성한 글 3'];
  const clist = [
    '내가 작성한 댓글 1',
    '내가 작성한 댓글 2',
    '내가 작성한 댓글 3',
  ];
  const vlist = [
    '내가 투표한 내역 1',
    '내가 투표한 내역 2',
    '내가 투표한 내역 3',
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getProfileRequest()
      setProfile(res.data?.result)
    }

    fetchProfile()
    .catch((err) => console.log(err))
  }, [])

  return (
    <div className='mypage'>
      <div className='mypage-left'>
        <div className='mypage-image-profile'></div>
        <div>
          {nickname}
          <Link to='/user/updateProfile'><EditIcon fontSize='inherit' /></Link>
        </div>
      </div>
      <div className='mypage-right'>
        <div>
          <span
            onClick={() => setMode('info')}
            className={`mypage-mode mypage-mode-start ${
              mode === 'info' ? 'mypage-selected' : null
            }`}>
            내 정보
          </span>
          <span
            onClick={() => setMode('article')}
            className={`mypage-mode ${
              mode === 'article' ? 'mypage-selected' : null
            }`}>
            작성한 글 목록
          </span>
          <span
            onClick={() => setMode('comment')}
            className={`mypage-mode ${
              mode === 'comment' ? 'mypage-selected' : null
            }`}>
            작성한 댓글 목록
          </span>
          <span
            onClick={() => setMode('vote')}
            className={`mypage-mode mypage-mode-end ${
              mode === 'vote' ? 'mypage-selected' : null
            }`}>
            투표 내역
          </span>
        </div>
        <div className='mypage-contents-box'>
          {mode === 'info' && (
            <div>
              <div className='mypage-image-tier'></div>
              <div className='mypage-contents-item'>
                티어 인증 했으면 소환사명 뭐 그런거
              </div>
              <div className='mypage-contents-item'>
                안했으면 티어 인증 버튼 넣기
              </div>
            </div>
          )}
          {mode === 'article' && (
            <div>
              {alist.map((a, idx) => (
                <div key={idx} className='mypage-contents-item'>
                  {a}
                </div>
              ))}
            </div>
          )}
          {mode === 'comment' && (
            <div>
              {clist.map((c, idx) => (
                <div key={idx} className='mypage-contents-item'>
                  {c}
                </div>
              ))}
            </div>
          )}
          {mode === 'vote' && (
            <div>
              {vlist.map((v, idx) => (
                <div key={idx} className='mypage-contents-item'>
                  {v}
                </div>
              ))}
            </div>
          )}
          <Pagination count={10} color='secondary' />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
