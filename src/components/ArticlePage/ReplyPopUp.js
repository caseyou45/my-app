import React, { useState } from "react";

import styles from "./ArticlePage.module.css";
import { useSelector } from "react-redux";
import commentService from "../../services/comment";
import ErrorHandler from "../ErrorHandler/ErrorHandler";

const ReplyPopUp = ({ setOpenReply, comment, setReplies, article }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const stateStoredUser = useSelector((state) => state.user);

  const handlePopUpClose = (event) => {
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
      };

      try {
        const reply = await commentService.reply(newComment);
        setReplies((prev) => [reply.data, ...prev]);
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
