import React, { useState, useEffect } from "react";
import { useMatch } from "react-router-dom";
import ArticelCard from "./ArticleCard/ArticleCard";
import Comment from "./CommentCard/Comment";
import styles from "./ArticlePage.module.css";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import articleServices from "../../services/article";

const ArticlePage = () => {
  const [article, setArticle] = useState("");
  const [comments, setComments] = useState([]);
  const [readyForRender, setReadyForRender] = useState(false);
  const [error, setError] = useState("");
  const match = useMatch("/article/id/:id");

  useEffect(() => {
    fetchArticleAndComments(match.params.id);
  }, [match.params.id]);

  const fetchArticleAndComments = (id) => {
    articleServices
      .getArticleById(id)
      .then((res) => {
        setArticle(res);
        setComments(res.comments);
        setReadyForRender(true);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const handleNewComment = (newComment) => {
    // Update the comments array with the new comment
    setComments([...comments, newComment]);
  };

  return (
    readyForRender && (
      <div>
        <ArticelCard
          article={article}
          comments={comments}
          setComments={setComments}
          fetchArticleAndComments={fetchArticleAndComments}
          handleNewComment={handleNewComment}
        />
        <div>
          {comments.length === 0 ? (
            <div className={styles.noComments}>
              <h3>No comments yet. Be the first.</h3>
            </div>
          ) : (
            <div className={styles.commentColumn}>
              {comments.map((comment, index) => (
                <div key={index}>
                  <Comment
                    subStyle={0}
                    comment={comment}
                    article={article}
                    fetchArticleAndComments={fetchArticleAndComments}
                  />
                </div>
              ))}
            </div>
          )}
          <ErrorHandler error={error} setError={setError} />
        </div>
      </div>
    )
  );
};

export default ArticlePage;
