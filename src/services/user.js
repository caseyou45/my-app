import axios from "axios";
const baseUrl = "/api/user";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const signup = async (user) => {
  const response = await axios.post(baseUrl + "/auth/signup", user);
  return response.data;
};

const signin = async (user) => {
  const response = await axios.post(baseUrl + "/auth/signin", user);
  return response.data;
};

const details = async (username) => {
  const config = {
    headers: { Authorization: token },
  };

  const user = await axios.get(baseUrl + "/details/" + username, config);
  return user.data;
};

const userServices = { signup, signin, setToken, details };
export default userServices;
