export const SET_OV_TOKEN = "article/SET_TOKEN";
export const SET_ROLE = "article/SET_ROLE";

const initState = {
  ovToken: '',
  role: ''
}

export const setOvToken = (ovToken) => {
  return {
    type: SET_OV_TOKEN,
    payload: ovToken
  }
}

export const setRole = (role) => {
  return {
    type: SET_ROLE,
    payload: role
  }
}

export default function (state = initState, action) {
  switch (action.type) {
    case SET_OV_TOKEN:
      return { ...state, ovToken: action.payload };
    case SET_ROLE:
      return { ...state, role: action.payload };
    default:
      return state;
  }
}
