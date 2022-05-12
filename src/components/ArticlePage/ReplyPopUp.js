import React, { useState } from "react";

import styles from "./ArticlePage.module.css";
import { useSelector } from "react-redux";
import commentService from "../../services/comment";
import ErrorHandler from "../ErrorHandler/ErrorHandler";

const ReplyPopUp = ({ setOpenReply, comment, setReplies }) => {
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const stateStoredUser = useSelector((state) => state.user);

  const handlePopUpClose = (event) => {
    setText("");
    setOpenReply(false);
  };

  const replyToComment = async (event) => {
    event.preventDefault();

    if (text !== "") {
      const newComment = {
        content: text,
        author: stateStoredUser.users_id,
        parent_comment: comment.comments_id,
        parent_article: comment.parent_article,
      };

      await commentService
        .newComment(newComment)
        .then((res) => {
          setReplies((prev) => [...prev, ...res.data]);
          handlePopUpClose();
        })
        .catch((err) => {
          setErrorMessage(err.response.data.error);
        });
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
      <ErrorHandler
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
export default ReplyPopUp;
