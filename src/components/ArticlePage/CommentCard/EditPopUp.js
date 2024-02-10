import React, { useState } from "react";
import styles from "../ArticlePage.module.css";
import ErrorHandler from "../../ErrorHandler/ErrorHandler";
import commentService from "../../../services/comment";

const EditPopUp = ({ setOpenEdit, comment, fetchArticleAndComments }) => {
  const [text, setText] = useState(comment.content);
  const [error, setError] = useState("");

  const handlePopUpClose = (event) => {
    setText("");
    setOpenEdit(false);
  };

  const editComment = async (event) => {
    event.preventDefault();
    comment.content = text;

    try {
      await commentService.editCommentService(comment);
      fetchArticleAndComments(comment.article);
      handlePopUpClose();
    } catch (error) {
      setError(error);
    }
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
      <ErrorHandler error={error} setError={setError} />
    </div>
  );
};
export default EditPopUp;
