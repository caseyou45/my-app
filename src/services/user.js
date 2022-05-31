import axios from "axios";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const signup = async (user) => {
  const response = await axios.post("/api/user/auth/signup", user);
  return response.data;
};

const signin = async (user) => {
  const response = await axios.post("/api/user/auth/signin", user);
  return response.data;
};

const details = async (username) => {
  const config = {
    headers: { Authorization: token },
  };

  const user = await axios.get(`/api/user/details/${username}`, config);
  return user.data;
};

const userServices = { signup, signin, setToken, details };
export default userServices;
