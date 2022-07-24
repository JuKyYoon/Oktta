import { loginRequest } from "../services/userService";


/* 액션 타입 선언 */
const LOGIN = 'user/LOGIN';
const LOGOUT = 'user/LOGOUT';
const SIGNUP = 'user/SIGNUP';
const PW_INQUIRY = 'user/PW_INQUIRY';
const UPDATE = 'user/UPDATE';


/* 요청 URL*/
const USER_URL = "/api/v1/users"


/* 액션 함수 선언 */
export const login = (dataToSubmit) => {
  const data = loginRequest(dataToSubmit);
  return{
    type: LOGIN,
    data
  }
}


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



export default function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      // 로그인 요청에 대한 응답으로 어떤 데이터가 오는지 확인해보고 state에 넣어주기
      console.log("로그인 응답: " + action.data) // 확인용
      return {...state,}

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