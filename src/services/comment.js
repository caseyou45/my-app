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
  return await axios.get(`${baseUrl}/user?username=${username}`, config);
};

const getCommentsLikedByUser = async (votes) => {
  const config = {
    headers: { Authorization: token },
  };

  let promises = [];

  for (let i = 0; i < votes.data.length; i++) {
    promises.push(
      axios.get(`${baseUrl}/voted/${votes.data[i].commentid}`, config)
    );
  }

  return Promise.all(promises);
};
let commentServices = {
  newComment,
  deleteCommentService,
  editCommentService,
  getCommentsByAritcleID,
  getCommentsMadeByUser,
  getCommentsLikedByUser,
  setToken,
};

export default commentServices;
