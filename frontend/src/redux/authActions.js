import { login, register } from "../api/apiCalls";
import * as ACTIONS from "./Constants";

export const logoutSuccess = () => {
  return {
    type: ACTIONS.LOGOUT_SUCCESS,
  };
};

export const loginSuccess = (authState) => {
  return {
    type: ACTIONS.LOGIN_SUCCESS,
    payload: authState,
  };
};

export const loginHandler = (creds) => {
  return async (dispatch) => {
    const response = await login(creds);
    const authState = {
      ...response.data,
      password: creds.password,
    };
    dispatch(loginSuccess(authState));
    return response;
  };
};

export const signupHandler = (user) => {
  return async (dispatch) => {
    const response = await register(user);
    await dispatch(loginHandler(user));
    return response;
  };
};
