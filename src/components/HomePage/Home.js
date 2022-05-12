import React, { useState, useEffect } from "react";

import NewsCard from "./NewsCard";

import styles from "./HomePage.module.css";
import articleServices from "../../services/article";
const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews("general");
  }, []);

  const fetchNews = async (category) => {
    try {
      const retrievedNewsFromDB = await articleServices.articlesByCategory(
        category
      );

      setNews([...retrievedNewsFromDB]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className={styles.news}>
        {news.map((article) => (
          <NewsCard article={article} key={article.articles_id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
