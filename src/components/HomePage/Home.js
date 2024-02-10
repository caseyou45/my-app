// Home.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewsCard from "./NewsCard";
import styles from "./HomePage.module.css";
import articleServices from "../../services/article";
import ErrorHandler from "../ErrorHandler/ErrorHandler";

const Home = () => {
  const { category } = useParams();
  const [news, setNews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNews(category || "general"); // If category is not provided, default to "general"
  }, [category]);

  const fetchNews = async (category) => {
    try {
      const retrievedNewsFromDB = await articleServices.articlesByCategory(
        category
      );
      setNews([...retrievedNewsFromDB]);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <div className={styles.news}>
        {news.map((article) => (
          <NewsCard article={article} key={article.id} />
        ))}
      </div>
      <ErrorHandler error={error} setError={setError} />
    </div>
  );
};

export default Home;
