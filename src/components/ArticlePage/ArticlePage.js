import React, { useState, useEffect } from "react";
import { useMatch } from "react-router-dom";
import ArticelCard from "./ArticleCard/ArticleCard";

import Comment from "./Comment";
import styles from "./ArticlePage.module.css";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import articleServices from "../../services/article";

const ArticlePage = () => {
  const [article, setArticle] = useState("");
  const [error, setError] = useState("");
  const match = useMatch("/article/id/:id");

  useEffect(() => {
    articleServices
      .articleById(match.params.id)
      .then((res) => {
        setArticle(res);
      })
      .catch((err) => {
        setError(err);
      });
  }, [match.params.id]);

  return (
    <div>
      <ArticelCard article={article} />
      {article !== "" && (
        <div>
          {article.comments.length === 0 ? (
            <div className={styles.noComments}>
              <h3>No comments yet. Be the first.</h3>
            </div>
          ) : (
            <div className={styles.commentColumn}>
              {article.comments.map((comment, index) => (
                <div key={index}>
                  <Comment subStyle={0} comment={comment} article={article} />
                </div>
              ))}
            </div>
          )}
          <ErrorHandler error={error} setError={setError} />
        </div>
      )}
    </div>
  );
};

export default ArticlePage;
