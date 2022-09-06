import axios from "axios";



export const register = (body) => {
    return axios.post('/auth/register', body);
}


export const login = (creds) => {
  return axios.post("/auth/login", creds);
};

export const getUsers = (page = 0, size = 3) => {
  return axios.get(`/api/1.0/users?page=${page}&size=${size}`);
};


export const setAuthorizationHeader = ({
    isLoggedIn,
    token
}) => {
  if (isLoggedIn) {
    axios.defaults.headers["Authorization"] = "Bearer "+ token;
  } else {
    delete axios.defaults.headers["Authorization"];
  }
};



