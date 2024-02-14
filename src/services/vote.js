import axios from "axios";

import localStorageManager from "../components/Utils/localStorageManager";

const baseUrl = "/api/like";

axios.interceptors.request.use((config) => {
  const token = localStorageManager.getUserToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const addVoteService = async (vote) => {
  try {
    const response = await axios.post(baseUrl, vote);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

const removeVoteService = async (vote) => {
  try {
    const response = await axios.patch(baseUrl, vote);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

const voteServices = {
  addVoteService,
  removeVoteService,
};

export default voteServices;
