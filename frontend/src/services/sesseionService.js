import { GET_SESSION } from '../modules/type.js';
import { store } from '..';

export const getSession = () => {
  const data = [
    { id: '0', title: '1번방입니다.', publisher: '방장1' },
    { id: '1', title: '2번방입니다.', publisher: '방장2' },
    { id: '2', title: '3번방입니다.', publisher: '방장3' },
    { id: '3', title: '4번방입니다.', publisher: '방장4' },
    { id: '4', title: '5번방입니다.', publisher: '방장5' },
    { id: '5', title: '6번방입니다.', publisher: '방장6' },
    { id: '6', title: '7번방입니다.', publisher: '방장7' },
    { id: '7', title: '8번방입니다.', publisher: '방장8' },
    { id: '8', title: '9번방입니다.', publisher: '방장9' },
    { id: '9', title: '10번방입니다.', publisher: '방장10' },
    { id: '10', title: '11번방입니다.', publisher: '방장11' },
    { id: '11', title: '12번방입니다.', publisher: '방장12' },
  ];
  const payload = data;

  //   const payload = '서버로 API 요청해서 받아오기';
  return {
    type: GET_SESSION,
    payload,
  };
};
