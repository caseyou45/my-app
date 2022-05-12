import axios from "axios";

const signup = async (user) => {
  const response = await axios.post("/api/user/auth/signup", user);

  return response.data;
};

const signin = async (user) => {
  const response = await axios.post("/api/user/auth/signin", user);
  return response.data;
};

const userServices = { signup, signin };
export default userServices;
