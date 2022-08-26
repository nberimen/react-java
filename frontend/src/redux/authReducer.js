import * as ACTIONS from "./Constants";

const initialState = {
  isLoggedIn: false,
  username: undefined,
  password: undefined,
};
const authReducer = (state = { ...initialState }, action) => {
  if (action.type === ACTIONS.LOGOUT_SUCCESS) {
    return initialState;
  } else if (action.type === ACTIONS.LOGIN_SUCCESS) {
    return {
      ...action.payload,
      isLoggedIn: true,
    };
  }
  return state;
};

export default authReducer;
