import {
  GET_ARTICLE,
  CREATE_ARTICLE,
  UPDATE_ARTICLE,
} from '../modules/types.js';
import { store } from '..';
import { request } from './axios.js';

const ARTICLE_URL = 'api/v1/board';

// 액션 생성함수
export const getArticle = () => {
  const data = [
    {
      id: '0',
      title: '1번방입니다.',
      content: '스타벅스 맛있어',
      publisher: '방장1',
    },
    {
      id: '1',
      title: '2번방입니다.',
      content: '스타벅스 맛없어',
      publisher: '방장2',
    },
    {
      id: '2',
      title: '3번방입니다.',
      content: '삼겹살 맛있어',
      publisher: '방장3',
    },
    {
      id: '3',
      title: '4번방입니다.',
      content: '가ㄴ다라나비',
      publisher: '방장4',
    },
    {
      id: '4',
      title: '5번방입니다.',
      content: '글렌모렌지 12',
      publisher: '방장5',
    },
    {
      id: '5',
      title: '6번방입니다.',
      content: '눈에 보이는대로 적는중',
      publisher: '방장6',
    },
    {
      id: '6',
      title: '7번방입니다.',
      content: '리액트....ㅎ',
      publisher: '방장7',
    },
    { id: '7', title: '8번방입니다.', content: '리덕스', publisher: '방장8' },
    {
      id: '8',
      title: '9번방입니다.',
      content: '일렉트론???',
      publisher: '방장9',
    },
    {
      id: '9',
      title: '10번방입니다.',
      content: '커피한잔',
      publisher: '방장10',
    },
    {
      id: '10',
      title: '11번방입니다.',
      content: '술 그만 먹기',
      publisher: '방장11',
    },
    {
      id: '11',
      title: '12번방입니다.',
      content: '역삼역 너무 멀어',
      publisher: '방장12',
    },
  ];
  const payload = data;

  //   const payload = '서버로 API 요청해서 받아오기';
  return {
    type: GET_ARTICLE,
    payload,
  };
};

export const createArticle = async (dataToSubmit) => {
  await request.post(ARTICLE_URL, dataToSubmit);
  return {
    type: CREATE_ARTICLE,
    dataToSubmit,
  };
};

export const updateArticle = async (dataToSubmit) => {
  const payload = await request.put(ARTICLE_URL, dataToSubmit);
  return {
    type: UPDATE_ARTICLE,
    payload,
  };
};
