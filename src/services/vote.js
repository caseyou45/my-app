import axios from "axios";
const baseUrl = "/api/votes";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const addVoteService = async (vote) => {
  const config = {
    headers: { Authorization: token },
  };
  const returnedVote = await axios.post(baseUrl, vote, config);
  return returnedVote;
};

const removeVoteService = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const deletedVote = await axios.delete(`${baseUrl}/${id}`, config);

  return deletedVote;
};

const voteServices = {
  addVoteService,
  removeVoteService,
  setToken,
};

export default voteServices;
