import axios from "axios";

const baseUrl = "/api/like";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const addVoteService = async (vote) => {
  console.log(vote);
  const config = {
    headers: { Authorization: token },
  };
  return await axios.post(baseUrl, vote, config);
};

const removeVoteService = async (vote) => {
  const config = {
    headers: { Authorization: token },
  };

  return await axios.patch(baseUrl, vote, config);
};

const voteServices = {
  addVoteService,
  removeVoteService,
  setToken,
};

export default voteServices;
