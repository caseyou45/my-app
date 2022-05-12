import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../UserPage.module.css";

import { NavLink } from "react-router-dom";
import commentServices from "../../../services/comment";

import ErrorHandler from "../../ErrorHandler/ErrorHandler";

const CommentsMade = ({ urlID, stateStoredUser }) => {
  const [comments, setComments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchUserComment(urlID);
  }, [urlID]);

  const fetchUserComment = async (id) => {
    try {
      const x = await axios.get(`/api/users/profile/comments/${id}`);
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
      const deleteInfo = {
        author: 5,
        content: "comment removed",
      };

      try {
        await commentServices.deleteCommentService(
          comment.comments_id,
          deleteInfo
        );

        let result = comments.filter(
          (el) => el.comments_id !== comment.comments_id
        );
        setComments(result);
      } catch (error) {
        setErrorMessage(error.response.data.error);
      }
    };

    return (
      <div className={styles.commentButtons}>
        {stateStoredUser.users_id === urlID && (
          <button name="delete" onClick={(event) => deleteComment(el)}>
            Delete
          </button>
        )}
        <NavLink
          className={
            stateStoredUser.users_id === urlID
              ? styles.navLink
              : styles.navLinkWithoutAuth
          }
          to={`/articles/${el.articles_id}`}
        >
          Go to Full Post
        </NavLink>
      </div>
    );
  };

  return (
    <div>
      <h3>
        {stateStoredUser.users_id !== urlID
          ? "Comments"
          : "Comments You've Made"}
      </h3>
      <div>
        {comments.map((el, index) => (
          <div className={styles.commentCard}>
            <p className={styles.title}>{el.title}</p>
            <p className={styles.userName}>
              <span>
                {stateStoredUser.users_id !== urlID
                  ? ` ${el.username}  `
                  : "You "}
              </span>
              wrote :
            </p>
            <p className={styles.commentBody}>{el.comment}</p>
            <MadeDate el={el} />
            <DeleteDisplay el={el} />
          </div>
        ))}
      </div>
      <ErrorHandler
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default CommentsMade;
