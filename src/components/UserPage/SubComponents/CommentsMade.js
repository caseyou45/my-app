import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../UserPage.module.css";

import { NavLink } from "react-router-dom";
import commentServices from "../../../services/comment";

import ErrorHandler from "../../ErrorHandler/ErrorHandler";

const CommentsMade = ({ urlUsername, stateStoredUser }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserComment(urlUsername);
  }, [urlUsername]);

  const fetchUserComment = async (urlUsername) => {
    try {
      const x = await commentServices.getCommentsMadeByUser(urlUsername);
      setComments(x.data);
    } catch (error) {}
  };

  const MadeDate = ({ el }) => {
    function timeSince(date) {
      var seconds = Math.floor((new Date() - Date.parse(date)) / 1000);

      var interval = seconds / 31536000;

      if (interval > 1) {
        return Math.floor(interval) + " year(s)";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + " month(s)";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + " day(s)";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + " hour(s)";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + " minute(s)";
      }
      return Math.floor(seconds) + " second(s)";
    }

    return <h5> Comment Made {timeSince(el.date)} ago</h5>;
  };

  const DeleteDisplay = ({ el }) => {
    const deleteComment = async (comment) => {
      try {
        await commentServices.deleteCommentService(comment);

        setComments((prev) => prev.filter((el) => el.id !== comment.id));
      } catch (error) {
        setError(error);
      }
    };

    return (
      <div className={styles.commentButtons}>
        {stateStoredUser.username === urlUsername && (
          <button name="delete" onClick={(event) => deleteComment(el)}>
            Delete
          </button>
        )}
        <NavLink
          className={
            stateStoredUser.username === urlUsername
              ? styles.navLink
              : styles.navLinkWithoutAuth
          }
          to={`/article/id/${el.particle}`}
        >
          Go to Full Post
        </NavLink>
      </div>
    );
  };

  return (
    <div>
      <h3>
        {stateStoredUser.username !== urlUsername
          ? "Comments"
          : "Comments You've Made"}
      </h3>
      <div>
        {comments.map((el, index) => (
          <div className={styles.commentCard}>
            <p className={styles.title}>{el.title}</p>
            <p className={styles.userName}>
              <span>
                {stateStoredUser.username !== urlUsername
                  ? ` ${el.username}  `
                  : "You "}
              </span>
              wrote :
            </p>
            <p className={styles.commentBody}>{el.content}</p>
            <MadeDate el={el} />
            <DeleteDisplay el={el} />
          </div>
        ))}
      </div>
      <ErrorHandler error={error} setError={setError} />
    </div>
  );
};

export default CommentsMade;
