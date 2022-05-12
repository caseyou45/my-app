import React, { useState } from "react";
import styles from "./ArticlePage.module.css";
import ErrorHandler from "../ErrorHandler/ErrorHandler";

import commentService from "../../services/comment";

const EditPopUp = ({
  setOpenEdit,
  replies,
  comments,
  comment,
  setComments,
  setReplies,
}) => {
  const [text, setText] = useState(comment.content);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePopUpClose = (event) => {
    setText("");
    setOpenEdit(false);
  };

  const editComment = (event) => {
    event.preventDefault();

    const newComment = {
      content: text,
    };

    commentService
      .editCommentService(comment.comments_id, newComment)
      .then((response) => {
        const comment = response.data;
        if (comment.parent_comment === null) {
          let result = comments.filter(
            (el) => el.comments_id !== comment.comments_id
          );
          setComments([...result, comment]);
          handlePopUpClose();
        }
        if (comment.parent_comment !== null) {
          let result = replies.filter(
            (el) => el.comments_id !== comment.comments_id
          );
          setReplies([...result, comment]);
          handlePopUpClose();
        }
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error);
      });
  };

  return (
    <div>
      <p className={styles.popUpText}>Edit your comment below.</p>
      <div className={styles.popupCard}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <div className={styles.popUpButton}>
          <button onClick={editComment}>Submit</button>
          <button onClick={handlePopUpClose}>Cancel</button>
        </div>
      </div>
      <ErrorHandler
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
export default EditPopUp;
