import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

const NewsCard = ({ article }) => {
  const [date, setDate] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    setDayForDisplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      </div>
    </div>
  );
};

export default NewsCard;
