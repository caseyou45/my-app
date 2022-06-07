import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../UserPage.module.css";

import { useMatch, NavLink } from "react-router-dom";
import voteServices from "../../../services/vote";
import ErrorHandler from "../../ErrorHandler/ErrorHandler";

const ArticlesLiked = () => {
  const [articlesLiked, setArticlesLiked] = useState([]);
  const match = useMatch("/profile/:id");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserComment(match.params.id);
  }, [match.params.id]);

  const fetchUserComment = async (id) => {
    try {
      const x = await axios.get(`/api/vote/${id}`);
      setArticlesLiked(x.data.filter((t) => t.comments_id === null));
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
          let x = articlesLiked.filter((a) => a.votes_id !== el.votes_id);
          setArticlesLiked(x);
        })
        .catch((error) => {
          setError(error);
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
      <h3>Articles You've Liked</h3>
      <div>
        {articlesLiked.map((el, index) => (
          <div key={index} className={styles.articleCard}>
            <p className={styles.title}>{el.title}</p>
            <a className={styles.storyLink} href={el.url}>
              {el.url.replace(/(.{30})..+/, "$1…")}
            </a>
            <LikedDate el={el} />
            <VoteDisplay el={el} />
          </div>
        ))}
      </div>
      <ErrorHandler error={error} setError={setError} />
    </div>
  );
};

export default ArticlesLiked;
