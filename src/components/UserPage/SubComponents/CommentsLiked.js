import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../UserPage.module.css";

import { NavLink } from "react-router-dom";
import ErrorHandler from "../../ErrorHandler/ErrorHandler";
import voteServices from "../../../services/vote";
import commentServices from "../../../services/comment";

const CommentsLiked = ({ urlUsername, stateStoredUser }) => {
  const [commentsLiked, setCommentsLiked] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserComment(urlUsername);
  }, [urlUsername]);

  const fetchUserComment = async (urlUsername) => {
    try {
      const likedComments = await commentServices.getCommentsLikedByUser(
        urlUsername
      );

      setCommentsLiked(likedComments.data);
    } catch (error) {
      setError(error);
    }
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
    const handleVote = (el) => {
      voteServices
        .removeVoteService(el)
        .then(() => {
          setCommentsLiked(commentsLiked.filter((a) => a.data.id !== el.id));
        })
        .catch((error) => {
          setError(error);
        });
    };

    return (
      <div className={styles.commentButtons}>
        {userVote !== true ? (
          <i onClick={() => handleVote(el)}>&#9829;</i>
        ) : (
          <i onClick={() => handleVote(el)} className="lni lni-lg lni-heart">
            &#9825;
          </i>
        )}

        <NavLink className={styles.navLink} to={`/articles/${el.particle}`}>
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
            <p className={styles.userName}>
              <span>
                {el.author !== stateStoredUser.id ? (
                  <a href={`/profile/${el.dataauthor}`}> {el.username}</a>
                ) : (
                  "You "
                )}
              </span>{" "}
              wrote :
            </p>
            <p className={styles.commentBody}>{el.content}</p>
            <LikedDate el={el} />
            <VoteDisplay el={el} />
          </div>
        ))}
      </div>
      <ErrorHandler error={error} setError={setError} />
    </div>
  );
};

export default CommentsLiked;
