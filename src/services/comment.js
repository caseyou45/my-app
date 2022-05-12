import axios from "axios";
const baseUrl = "/api/comment";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  console.log(token);
};

const newComment = async (comment) => {
  const config = {
    headers: { Authorization: token },
  };
  const returnedComment = await axios.post(baseUrl, comment);
  return returnedComment;
};

const deleteCommentService = async (id, deleteInfo) => {
  const config = {
    headers: { Authorization: token },
  };
  const deletedComment = await axios.patch(
    `${baseUrl}/delete/${id}`,
    deleteInfo,
    config
  );

  return deletedComment;
};

const editCommentService = async (id, editInfo) => {
  const config = {
    headers: { Authorization: token },
  };
  const editedComment = await axios.patch(
    `${baseUrl}/edit/${id}`,
    editInfo,
    config
  );

  return editedComment;
};

let commentServices = {
  newComment,
  deleteCommentService,
  editCommentService,
  setToken,
};

export default commentServices;
