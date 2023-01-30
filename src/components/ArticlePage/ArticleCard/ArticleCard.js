import React, { useState } from "react";
import CommentTextArea from "./TextArea";
import styles from "./ArticleCard.module.css";
import ErrorHandler from "../../ErrorHandler/ErrorHandler";

const ArticleCard = ({ article, comments, setComments }) => {
  const [error, setError] = useState("");

  return (
    <div>
      <div className={styles.article}>
        <h2>{article.title}</h2>
        <div className={styles.storyCard}>
          <img alt="News" loading="lazy" src={article.urltoimage}></img>
          <div>
            <h5>
              {article.name} {article.author !== null && `- ${article.author}`}
            </h5>
            <p>{article.content}</p>
            <a href={article.url}>{article.url.replace(/(.{35})..+/, "$1…")}</a>
          </div>
        </div>
        <CommentTextArea
          styles={styles}
          error={error}
          setError={setError}
          article={article}
          comments={comments}
          setComments={setComments}
        />
      </div>
      <ErrorHandler error={error} setError={setError} />
    </div>
  );
};

export default ArticleCard;
