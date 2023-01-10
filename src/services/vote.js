import axios from "axios";

const baseUrl = "/api/vote";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const addVoteService = async (vote) => {
  const config = {
    headers: { Authorization: token },
  };
  return await axios.post(baseUrl, vote, config);
};

const removeVoteService = async (vote) => {
  const config = {
    headers: { Authorization: token },
  };

  return await axios.patch(baseUrl + "/delete", vote, config);
};

const getVotesByCommentID = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  return await axios.get(`${baseUrl}/comment?id=${id}`, config);
};

const getVotesByUsername = async (username) => {
  const config = {
    headers: { Authorization: token },
  };
  return await axios.get(`${baseUrl}/user?username=${username}`, config);
};

const voteServices = {
  addVoteService,
  removeVoteService,
  getVotesByCommentID,
  getVotesByUsername,
  setToken,
};

export default voteServices;
