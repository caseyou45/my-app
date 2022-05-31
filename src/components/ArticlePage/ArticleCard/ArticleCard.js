import React, { useState } from "react";

import commentService from "../../../services/comment";
import { useSelector } from "react-redux";
import styles from "./ArticleCard.module.css";
import ErrorHandler from "../../ErrorHandler/ErrorHandler";

const ArticleCard = ({ setComments, article }) => {
  const [openComment, setOpenComment] = useState(false);
  const [commentToPost, setCommentToPost] = useState("");
  const stateStoredUser = useSelector((state) => state.user);

  const [errorMessage, setErrorMessage] = useState("");

  const checkAuth = () => {
    if (stateStoredUser) {
      return true;
    } else return false;
  };

  const handleCommentOpen = (event) => {
    if (checkAuth() === true) {
      if (openComment === false) {
        setOpenComment(true);
      }
    } else {
      setErrorMessage("You need to be logged in.");
    }
  };

  const handleCommentClose = (event) => {
    if (openComment === true) {
      setOpenComment(false);
      setCommentToPost("");
    }
  };

  const addComment = async (event) => {
    event.preventDefault();

    if (commentToPost !== "") {
      const newComment = {
        content: commentToPost,
        author: stateStoredUser.id,
        date: new Date(),
        pcomment: null,
        particle: article.id,
        username: stateStoredUser.username,
      };

      try {
        const res = await commentService.newComment(newComment);
        setComments((prev) => [res.data, ...prev]);
        handleCommentClose();
        setCommentToPost("");
      } catch (error) {
        handleCommentClose();
        setErrorMessage(error.response.statusText);
        setCommentToPost("");
      }
    }
  };

  return (
    <div>
      {article && (
        <div className={styles.article}>
          <h2>{article.title}</h2>
          <div className={styles.storyCard}>
            <img alt="News" loading="lazy" src={article.urltoimage}></img>
            <div>
              <h5>
                {article.name}{" "}
                {article.author !== null && `- ${article.author}`}
              </h5>
              <p>{article.content}</p>
              <a href={article.url}>
                {article.url.replace(/(.{35})..+/, "$1…")}
              </a>
            </div>
          </div>
          {openComment === false ? (
            <button onClick={handleCommentOpen}>Comment</button>
          ) : (
            <div className={styles.popupCard}>
              <textarea
                value={commentToPost}
                onChange={(e) => setCommentToPost(e.target.value)}
              ></textarea>
              <div className={styles.popUpButton}>
                <button onClick={addComment}>Submit</button>
                <button onClick={handleCommentClose}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}
      <ErrorHandler
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default ArticleCard;
