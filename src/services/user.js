import axios from "axios";
const baseUrl = "/api/user/auth";

const signup = async (user) => {
  const response = await axios.post(baseUrl + "/signup", user);
  if (response.status === 200) {
    return signin(user);
  }
  return response.data;
};

const signin = async (user) => {
  const response = await axios.post(baseUrl + "/signin", user);
  return response.data;
};

const getUser = async (username) => {
  try {
    const response = await axios.get(baseUrl + "?username=" + username);
    return response.data;
  } catch (error) {
    return error;
  }
};

const userServices = { signup, signin, getUser };
export default userServices;
