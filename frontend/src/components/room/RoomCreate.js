import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { createRoom } from '../../services/roomService';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '../../util/build/ckeditor';
import '@ckeditor/ckeditor5-build-classic/build/translations/ko';
import '../../styles/room.scss';

const RoomCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const onTitleChanged = (event) => {
    setTitle(event.target.value);
  };

  const onSubmitClicked = (event) => {
    event.preventDefault();
    const body =
      // {
      //   title,
      //   content,
      // };
      {
        title: 'default로 만든 제목',
        content: '<p>월요일은 쉬는날;;</p>',
        matchDto: {
          matchId: 'KR_5980803427',
          queueId: 440,
          mapId: 11,
          gameMode: 'CLASSIC',
          gameStartTimestamp: 1655814792808,
          gameEndTimestamp: 1655816355664,
          matchRank: 41,
          participants: [
            {
              participantId: 1,
              teamId: 100,
              summonerId: 'uDlZi1O8q-1tsZE__VwWYJGLJZUZxpKJg1DkcIUNrfCfB9I',
              summonerName: '노루 마약해요',
              teamPosition: 'TOP',
              championId: 266,
              championName: 'Aatrox',
              kills: 3,
              assists: 5,
              deaths: 5,
              puuid:
                'smh-VCgKspZ2qg-37Y7Qrs_IWO39-HQQmwwJ6xbw6znjsvITfW3QuWV3hPotZKqmTH0Rv1IeLpZuog',
              win: false,
            },
            {
              participantId: 2,
              teamId: 100,
              summonerId: 'x5_v7DaMsBMzUdry_iHJzPBjpi5X303P5bLC8qfCNDeqpJ0',
              summonerName: 'ya빡치냥',
              teamPosition: 'JUNGLE',
              championId: 77,
              championName: 'Udyr',
              kills: 11,
              assists: 4,
              deaths: 7,
              puuid:
                'YegER6SrIKserQ8qUMvyayR9d6XzhtESAAFiXeWDOmOzElR25CVMJiWZ48oeVjnh9z4HUG1lmAzlew',
              win: false,
            },
            {
              participantId: 3,
              teamId: 100,
              summonerId:
                'oxqjVOBP7vnsffW2zazq5eDTLYRatcaMo6mxu090DBQr2YLJPZSn8aUUFg',
              summonerName: '그냥 먼지',
              teamPosition: 'MIDDLE',
              championId: 45,
              championName: 'Veigar',
              kills: 7,
              assists: 5,
              deaths: 13,
              puuid:
                'M4H-EKCkP012qXPc8dEjYJ7ZhO9h6CXB-0dYqIaAJRPgOkONspf62rWUXphSZclcUDgmTlx6s_ZJLw',
              win: false,
            },
            {
              participantId: 4,
              teamId: 100,
              summonerId: 'c6AUBZyDMjku1JH8VGD5dhgMCggLaf-gd2kFaLantvotE_Q',
              summonerName: 'CS 포기요',
              teamPosition: 'BOTTOM',
              championId: 51,
              championName: 'Caitlyn',
              kills: 1,
              assists: 4,
              deaths: 8,
              puuid:
                '51hh43Puxi8r9j4MC6q13Ad27TTeWouCuUPgQFI8DjMTQL25tDAr-D8_b6pnLEhPxkxp_rk68hdOFQ',
              win: false,
            },
            {
              participantId: 5,
              teamId: 100,
              summonerId: 'Oa-Voau6Dyl-zyxh2V_AtDREafnrKcejESHgzYaWkrpsww',
              summonerName: '루루까까꿍꿍',
              teamPosition: 'UTILITY',
              championId: 25,
              championName: 'Morgana',
              kills: 0,
              assists: 4,
              deaths: 9,
              puuid:
                'k4tf6mzu9KAc-rt8P1duu6aF2StNIwjhN9UhPuYdqwGOpns9wdWpkD2wCGvcpfIIjvR-UDDFsmXJLQ',
              win: false,
            },
            {
              participantId: 6,
              teamId: 200,
              summonerId:
                '7PIbRIttWu7aloRdaOqXQHNlE6bC4gwENoagj21I7XWlpFYVsAA_Sdcb5A',
              summonerName: 'PLAYERHYUK1',
              teamPosition: 'TOP',
              championId: 122,
              championName: 'Darius',
              kills: 8,
              assists: 1,
              deaths: 5,
              puuid:
                'N7A8WeAoO1cB5FE1_MCi8YVT3fP9AKk1o2rFpDI0KWRmkksxScDOLWgP9vGiGVd6EXU0uYJcGj6VAQ',
              win: true,
            },
            {
              participantId: 7,
              teamId: 200,
              summonerId: 'CJkNuapHs4gLq6WsAhBtSaiTyA-y_DdAsC7cYZJv0w0pryY',
              summonerName: '코 샥',
              teamPosition: 'JUNGLE',
              championId: 64,
              championName: 'LeeSin',
              kills: 7,
              assists: 5,
              deaths: 9,
              puuid:
                'JeOsrfd7vjIFe9pr0ljpzx6Wm6CpsP_pQuKv6LREm5tKB7igfLPeXwHxKdDA1xR7PHj2yD0teR5FGg',
              win: true,
            },
            {
              participantId: 8,
              teamId: 200,
              summonerId: 'ylyum0C7kgLrKpRJnXMP1gOZQbX1VxQ2dzgOAZ5lB9VriTE',
              summonerName: '별빛량이',
              teamPosition: 'MIDDLE',
              championId: 61,
              championName: 'Orianna',
              kills: 19,
              assists: 5,
              deaths: 4,
              puuid:
                'WpqvPtRoANZfeIikoV0Ee5Jr9j-_cSYtll2J4s34EKNaAo3y6CgBhNGyLKNks_N7t4LHATjqZa82vg',
              win: true,
            },
            {
              participantId: 9,
              teamId: 200,
              summonerId: 'WhEDnnLBOmkZoyqKBt7bmgnQ_CPImdU2Dy013ndoO_lzcg',
              summonerName: '짭더리퍼',
              teamPosition: 'BOTTOM',
              championId: 81,
              championName: 'Ezreal',
              kills: 7,
              assists: 8,
              deaths: 1,
              puuid:
                'l2QoU-nIAeAPeryCwth2jYIE6EFbwHWi7euiWtntyCzyV3cFvgDhJ88CWNvVZlFJHZ5WxMLRl3_Veg',
              win: true,
            },
            {
              participantId: 10,
              teamId: 200,
              summonerId: 'iH-kFqLBcKmoNclT6F4GXwqUaTsMa-DArJPCwYegB9leOqk',
              summonerName: 'twisted joker',
              teamPosition: 'UTILITY',
              championId: 43,
              championName: 'Karma',
              kills: 1,
              assists: 18,
              deaths: 3,
              puuid:
                '1xZuIidlk4zD97BvSHmYUkEm8ixUW2y_jd6xvPr6MwQSGqWGBJKL-G5fyjgYYpDtHz0D6v1g-hJcuA',
              win: true,
            },
          ],
        },
      };

    createRoom(body)
      .then((res) => {
        if (res.data.message === 'success') {
          navigate(`/room/${res.data.result}`);
        } else {
          alert('옥상 생성에 실패하였습니다. 옥상 목록으로 이동합니다.');
          navigate('/room/list');
        }
      })
      .catch((err) => console.log(err));
  };

  const isValid = Boolean(title) && Boolean(content);

  return (
    <div className='room'>
      <h2>게시글 등록</h2>
      <span>갈등상황을 해결해봅시다!</span>
      <span>갈등상황에 대해 제목과 간략한 설명을 적어주세요!</span>
      <hr className='hrLine'></hr>

      <label htmlFor='title' className='create-room-label'>
        제목
      </label>
      <input
        className='create-room-input'
        placeholder='제목을 입력해주세요.'
        type='text'
        name='title'
        value={title}
        onChange={onTitleChanged}
      />
      <label htmlFor='title' className='create-room-label'>
        내용
      </label>
      <div>
        <CKEditor
          editor={ClassicEditor}
          config={{
            language: 'ko',
            placeholder: '갈등내용을 입력해주세요',
          }}
          onChange={(event, editor) => {
            setContent(editor.getData());
          }}
        />
      </div>

      <Button
        variant='outlined'
        color='veryperi'
        onClick={onSubmitClicked}
        disabled={!isValid}
      >
        등록하기
      </Button>
    </div>
  );
};

export default RoomCreate;
