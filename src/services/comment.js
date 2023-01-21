import axios from "axios";
const baseUrl = "/api/comment";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const newComment = async (comment) => {
  const config = {
    headers: { Authorization: token },
  };
  return await axios.post(baseUrl, comment, config);
};

const reply = async (comment) => {
  const config = {
    headers: { Authorization: token },
  };

  return await axios.post(baseUrl + "/reply", comment, config);
};

const deleteCommentService = async (deleteInfo) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    return await axios.patch(`${baseUrl}/delete`, deleteInfo, config);
  } catch (error) {
    return error;
  }
};

const editCommentService = async (editInfo) => {
  try {
    const config = {
      headers: { Authorization: token },
    };

    return await axios.patch(`${baseUrl}/edit`, editInfo, config);
  } catch (error) {
    return error;
  }
};

const getCommentsByAritcleID = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  return await axios.get(`${baseUrl}/article?id=${id}`, config);
};

const getCommentsMadeByUser = async (username) => {
  const config = {
    headers: { Authorization: token },
  };
  return await axios.get(`${baseUrl}/made/user?username=${username}`, config);
};

const getCommentsLikedByUser = async (username) => {
  const config = {
    headers: { Authorization: token },
  };

  return await axios.get(`${baseUrl}/liked/user?username=${username}`, config);
};
let commentServices = {
  newComment,
  reply,
  deleteCommentService,
  editCommentService,
  getCommentsByAritcleID,
  getCommentsMadeByUser,
  getCommentsLikedByUser,
  setToken,
};

export default commentServices;
