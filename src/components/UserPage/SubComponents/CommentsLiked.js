import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../UserPage.module.css";

import { NavLink } from "react-router-dom";
import ErrorHandler from "../../ErrorHandler/ErrorHandler";
import voteServices from "../../../services/vote";

const CommentsLiked = ({ urlID, stateStoredUser }) => {
  const [commentsLiked, setCommentsLiked] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchUserComment(urlID);
  }, [urlID]);

  const fetchUserComment = async (id) => {
    try {
      const x = await axios.get(`/api/users/profile/likes/comments/${id}`);
      setCommentsLiked(x.data.filter((t) => t.comments_id !== null));
    } catch (error) {}
  };

  const LikedDate = ({ el }) => {
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

    return <h5> Liked {timeSince(el.date)} ago</h5>;
  };

  const VoteDisplay = ({ el }) => {
    const userVote = false;
    const handleVote = (id) => {
      voteServices
        .removeVoteService(id)
        .then(() => {
          let x = commentsLiked.filter((a) => a.votes_id !== el.votes_id);
          setCommentsLiked(x);
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
        });
    };

    return (
      <div className={styles.commentButtons}>
        {userVote !== true ? (
          <i
            onClick={() => handleVote(el.votes_id)}
            className="lni lni-lg lni-heart-filled"
          ></i>
        ) : (
          <i
            onClick={() => handleVote(el.votes_id)}
            className="lni lni-lg lni-heart"
          ></i>
        )}
        <NavLink className={styles.navLink} to={`/articles/${el.articles_id}`}>
          Go to Full Post
        </NavLink>
      </div>
    );
  };
  return (
    <div>
      <h3>Comments You've Liked</h3>
      <div>
        {commentsLiked.map((el, index) => (
          <div className={styles.commentCard}>
            <p className={styles.title}>{el.title}</p>
            <p className={styles.userName}>
              <span>
                {el.author !== stateStoredUser.users_id ? (
                  <a href={`/profile/${el.author}`}> {el.username}</a>
                ) : (
                  "You "
                )}
              </span>{" "}
              wrote :
            </p>
            <p className={styles.commentBody}>{el.comment_content}</p>
            <LikedDate el={el} />
            <VoteDisplay el={el} />
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

export default CommentsLiked;
