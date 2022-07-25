import { LOGIN, GOOGLE_LOGIN } from "../modules/types.js";

/* 요청 URL*/
const USER_URL = "/api/v1/users";

/////////////////////////////////
/* 아직 구현하지 않은 부분
export const pwInquiry = (id) => ({
  type: PW_INQUIRY,
  userInfo: {
    id,
    // 토큰?
  }
});

export const update = (id, password, nickname) => ({
  type: UPDATE,
  userInfo: {
    id,
    password,
    nickname
    // 토큰?
  }
});
*/
//////////////////////////

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, data: action.payload };
    case GOOGLE_LOGIN:
      return { ...state, data: action.payload };

    //////////////////////////////////////////
    /* 아직 구현하지 않은 부분
    case PW_INQUIRY:
      response = request('POST', '', action.userInfo); // API 물어보고 넣기
      console.log(response);
      // return 새로운 state
      return ;

    case UPDATE:
      response = request('PUT', '', action.userInfo); // API 물어보고 넣기
      console.log(response);
      // return 새로운 state
      return ;
  */
    ///////////////////////////////////////////
    default:
      return state;
  }
}
