import axios from "axios";

import localStorageManager from "../components/Utils/localStorageManager";

const baseUrl = "/api/comment";

axios.interceptors.request.use((config) => {
  const token = localStorageManager.getUserToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const newComment = async (comment) => {
  try {
    const response = await axios.post(baseUrl, comment);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const reply = async (comment) => {
  try {
    const response = await axios.post(`${baseUrl}/reply`, comment);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const deleteCommentService = async (deleteInfo) => {
  try {
    const response = await axios.patch(`${baseUrl}/delete`, deleteInfo);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const editCommentService = async (comment) => {
  try {
    const response = await axios.patch(baseUrl, comment);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getCommentsByArticleID = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/article?id=${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getCommentsMadeByUser = async (username) => {
  try {
    const response = await axios.get(
      `${baseUrl}/made/user?username=${username}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getCommentsLikedByUser = async (username) => {
  try {
    const response = await axios.get(
      `${baseUrl}/liked/user?username=${username}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const commentServices = {
  newComment,
  reply,
  deleteCommentService,
  editCommentService,
  getCommentsByArticleID,
  getCommentsMadeByUser,
  getCommentsLikedByUser,
};

export default commentServices;
