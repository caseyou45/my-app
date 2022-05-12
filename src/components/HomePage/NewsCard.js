import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./HomePage.module.css";
import voteServices from "../../services/vote";

import ErrorHandler from "../ErrorHandler/ErrorHandler";

const NewsCard = ({ article }) => {
  const [userVote, setUserVote] = useState(null);
  const [comnmentTotal, setCommentTotal] = useState(0);

  const [date, setDate] = useState("");

  const [voteTotalForArticle, setVoteTotalForArticle] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  let navigate = useNavigate();

  const stateStoredUser = useSelector((state) => state.user);

  useEffect(() => {
    // getCommentAndVoteCounts();
    setDayForDisplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCommentAndVoteCounts = async () => {
    try {
      const commentsToCount = await axios.get(
        `/api/comments/${article.articles_id}`
      );

      handelCommentCount(commentsToCount.data);

      const votesToCount = await axios.get(`/api/votes/${article.id}`);

      handleVoteCount(votesToCount.data);
    } catch (err) {
      console.error(err);
    }
  };

  const setDayForDisplay = () => {
    var dateObj = new Date(article.publishedat);
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    let weekDay = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
      dateObj
    );
    let newdate = `${weekDay}, ${month}/${day}/${year}`;

    setDate(newdate);
  };
  const pickArticle = (id, navigate) => {
    navigate(`/article/id/${id}`, { replace: true });
  };

  const handelCommentCount = (comments) => {
    setCommentTotal(comments.length);
  };

  const handleVoteCount = (votes) => {
    setVoteTotalForArticle(
      votes.filter((el) => el.comments_id === null).length
    );

    const vote = votes.find((el) => el.author === stateStoredUser.users_id);
    if (vote !== undefined) {
      setUserVote(vote);
    }
  };

  const handleVote = async (article) => {
    if (userVote === null) {
      const vote = {
        vote: 1,
        articles_id: article.articles_id,
        comments_id: null,
        author: stateStoredUser.users_id,
      };

      try {
        const voteMade = await voteServices.addVoteService(vote);

        setUserVote(voteMade.data[0]);

        setVoteTotalForArticle(voteTotalForArticle + 1);
      } catch (error) {
        setErrorMessage(error.response.data.error);
      }
    } else {
      try {
        await voteServices.removeVoteService(userVote.votes_id);

        setUserVote(null);

        setVoteTotalForArticle(voteTotalForArticle - 1);
      } catch (error) {
        setErrorMessage(error.response.data.error);
      }
    }
  };

  return (
    <div className={styles.newsCard}>
      <div className={`${styles.cardColumn} ${styles.pointer}`}>
        <div
          onClick={() => {
            pickArticle(article.id, navigate);
          }}
        >
          <div className={`${styles.imageStyle}`}>
            <img alt="News" src={article.urltoimage}></img>
          </div>
          <h5>
            {article.name !== null
              ? `${article.source_name},`
              : `${article.author},`}{" "}
            {date} • <a href={article.url}> Navigate to Article</a>
          </h5>
          <h4>{article.title}</h4>
        </div>
        {/* <div className={styles.buttonRow}>
          <div className={styles.row}>
            {userVote !== null ? (
              <i
                onClick={() => handleVote(article)}
                className="lni lni-lg lni-heart-filled"
              ></i>
            ) : (
              <i
                onClick={() => handleVote(article)}
                className="lni lni-lg lni-heart"
              ></i>
            )}
            <p>{voteTotalForArticle}</p>
          </div>
          <div className={styles.row}>
            <i
              className="lni lni-lg lni-comments-alt"
              onClick={() => {
                pickArticle(article.articles_id);
              }}
            ></i>
            <p>{comnmentTotal}</p>
          </div>
        </div> */}
      </div>

      <ErrorHandler
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default NewsCard;
