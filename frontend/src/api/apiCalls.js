import axios from "axios";



export const register = (body) => {
    return axios.post('/auth/register', body);
}


export const login = (creds) => {
  return axios.post("/auth/login", creds);
};

export const setAuthorizationHeader = ({
    isLoggedIn,
    token
}) => {
  if (isLoggedIn) {
    axios.defaults.headers["Authorization"] = token;
  } else {
    delete axios.defaults.headers["Authorization"];
  }
};



