import { request } from '../utils/axios';


/* 액션 타입 선언 */
const LOGIN = 'user/LOGIN';
const LOGOUT = 'user/LOGOUT';
const SIGNUP = 'user/SIGNUP';
const PW_INQUIRY = 'user/PW_INQUIRY';
const UPDATE = 'user/UPDATE';

/* 액션 함수 선언 */
export const login = (id, password) => ({
  type: LOGIN,
  userInfo: {
    id,
    password
  }
});

export const logout = (id) => ({
  type: LOGOUT,
  userInfo: {
    id
    // 토큰?
  }
});

export const signup = (id, password, nickname) => ({
  type: SIGNUP,
  userInfo: {
    id,
    password,
    nickname
  }
});

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

/* 초기 상태 선언 */
const initialState  = {
  currentUser: {
    // 서버에서 받아오기
    id: '',
    nickname: '',
    profile_img: '',
    role: '',
    // riot api
    tier: '',
    summonorName: '',
  },
  accessToken: '',
}

let response = {}

export default function user(state = currentUser, action) {
  switch (action.type) {
    case LOGIN:
      if (!state.currentUser.id) {
        const data = action.userInfo;
        const response = request('POST', '', data); // login API 물어보고 넣기
        console.log(response)
        
        // if (응답 정상) {
          // accessToken ??
          // refreshToken ??
          // return 받아온 유저 정보 담아서 새로운 state
          // } else {
            // 에러메세지
            // return state 아니면 에러메세지;
            // }
          }

    case LOGOUT:
      if (state.currentUser.id) {
        const data = action.userInfo;
        const response = request('GET', '', data); // API 물어보고 넣기
        console.log(response);
        // return 새로운 state
      } else {
        // return 에러메세지
      };
      
    case SIGNUP:
      response = request('POST', '', action.userInfo); // API 물어보고 넣기
      console.log(response);
      // return 새로운 state     
      return ;
  
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

    default:
      return state;
  }
}