import React, { useState } from "react";
import commentService from "../../../services/comment";
import { useSelector } from "react-redux";
import styles from "./ArticleCard.module.css";

const CommentTextArea = ({ setError, article }) => {
  const [openComment, setOpenComment] = useState(true);
  const [commentToPost, setCommentToPost] = useState("");
  const stateStoredUser = useSelector((state) => state.user);

  const handleCommentClick = (event) => {
    if (openComment) {
      setOpenComment(false);
      setCommentToPost("");
    } else {
      setOpenComment(true);
    }
  };

  const addComment = async (event) => {
    event.preventDefault();

    if (commentToPost !== "") {
      const newComment = {
        author: stateStoredUser.id,
        deleted: false,
        parentComment: null,
        article: article.id,
        content: commentToPost,
        date: new Date(),
        username: stateStoredUser.username,
      };

      try {
        await commentService.newComment(newComment);
      } catch (error) {
        setError(error);
      }
      handleCommentClick();
    }
  };
  return (
    <div>
      {openComment ? (
        <button onClick={handleCommentClick}>Comment</button>
      ) : (
        <div className={styles.popupCard}>
          <textarea
            value={commentToPost}
            onChange={(e) => setCommentToPost(e.target.value)}
          ></textarea>
          <div className={styles.popUpButton}>
            <button onClick={addComment}>Submit</button>
            <button onClick={handleCommentClick}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentTextArea;
