import React, { useState, useEffect } from "react";

import articleServices from "../../services/article";
import NewsCard from "../HomePage/NewsCard";
import { useMatch } from "react-router-dom";

import styles from "../HomePage/HomePage.module.css";

const CategoryPage = () => {
  const match = useMatch("/category/:id");

  const [news, setNews] = useState([]);
  const [categoryChoice, setCategoryChoice] = useState(match.params.id);
  useEffect(() => {
    if (match.params.id !== categoryChoice || news.length === 0) {
      setCategoryChoice(match.params.id);
      fetchNews(match.params.id);
    }
  }, [match.params.id, categoryChoice, news.length]);

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
      <div className={`${styles.news}`}>
        {news.map((article) => (
          <NewsCard article={article} key={article.id} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
