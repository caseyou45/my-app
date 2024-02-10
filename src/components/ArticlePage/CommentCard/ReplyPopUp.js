import React, { useState } from "react";

import styles from "../ArticlePage.module.css";
import { useSelector } from "react-redux";
import commentService from "../../../services/comment";
import ErrorHandler from "../../ErrorHandler/ErrorHandler";

const ReplyPopUp = ({
  setOpenReply,
  comment,
  article,
  fetchArticleAndComments,
}) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const stateStoredUser = useSelector((state) => state.user);

  const handlePopUpClose = () => {
    setText("");
    setOpenReply(false);
  };

  const replyToComment = async (event) => {
    event.preventDefault();

    if (text !== "") {
      const newComment = {
        author: stateStoredUser.id,
        deleted: false,
        parentComment: comment.id,
        article: article.id,
        content: text,
        date: new Date(),
        username: stateStoredUser.username,
      };

      try {
        await commentService.reply(newComment);
        fetchArticleAndComments(article.id);
        handlePopUpClose();
      } catch (error) {
        setError(error);
      }
    }
  };

  return (
    <div>
      <p className={styles.popUpText}>
        Reply to <span>{comment.username}</span> below.
      </p>
      <div className={styles.popupCard}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <div className={styles.popUpButton}>
          <button onClick={replyToComment}>Submit</button>
          <button onClick={handlePopUpClose}>Cancel</button>
        </div>
      </div>
      <ErrorHandler error={error} setError={setError} />
    </div>
  );
};
export default ReplyPopUp;
