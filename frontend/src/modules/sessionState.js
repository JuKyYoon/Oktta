/* 액션 타입 선언 */
const CHANGE_STATE = 'screen/CHANGE_STATE';

/* 액션 함수 선언 */
export const changeState = (data) => {
  return{
    type: CHANGE_STATE,
    data
  }
};

/* 초기 상태 선언 */
const initialState  = {
  mySessionId: 'SessionA',
  myUserName: 'Participant' + Math.floor(Math.random() * 100),
  session: undefined,
  mainStreamManager: undefined,
  publisher: undefined,
  subscribers: [],
};



export default function sessionState(state = initialState, action) {
  switch (action.type) {
    case CHANGE_STATE:
      const { data } = action
      const newState = { ...state }
      for (let key in data) {
        newState[key] = data[key]
      }
      return newState

    default:
      return state;
  }
};