import axios from "axios";
const baseUrl = "/api/user";

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

const userServices = { signup, signin };
export default userServices;
