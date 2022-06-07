import React, { useState, useEffect } from "react";
import { useMatch } from "react-router-dom";
import ArticelCard from "./ArticleCard/ArticleCard";

import Comment from "./Comment";
import styles from "./ArticlePage.module.css";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import commentServices from "../../services/comment";
import articleServices from "../../services/article";

const ArticlePage = () => {
  const [article, setArticle] = useState("");

  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);

  const [load, setLoad] = useState(false);

  const [error, setError] = useState("");

  const match = useMatch("/article/id/:id");

  useEffect(() => {
    const getArticleandCommentsVotes = async () => {
      try {
        // Get Article
        const article = await articleServices.articleById(match.params.id);

        // Set Article
        setArticle(article);

        setLoad(true);
      } catch (error) {
        setError(error);
      }

      // Get Comments
      try {
        const comments = await commentServices.getCommentsByAritcleID(
          match.params.id
        );
        setComments(comments.data.filter((el) => el.pcomment == null));

        setReplies(comments.data.filter((el) => el.pcomment !== null));
      } catch (error) {
        setError(error);
      }
    };

    if (load === false) getArticleandCommentsVotes();
  }, [load, match.params.id]);

  const deleteComment = async (comment) => {
    comment.username = "removed";
    comment.content = "comment removed";

    try {
      const removedComment = await commentServices.deleteCommentService(
        comment.id,
        comment
      );

      if (comment.pcomment === null) {
        let result = comments.filter((el) => el.id !== comment.id);
        setComments([...result, removedComment.data]);
      } else {
        let result = replies.filter((el) => el.id !== comment.id);
        setReplies([...result, removedComment.data]);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <ArticelCard setComments={setComments} article={article} />
      {load === true && (
        <div>
          {comments.length === 0 ? (
            <div className={styles.noComments}>
              <h3>No comments yet. Be the first.</h3>
            </div>
          ) : (
            <div className={styles.commentColumn}>
              {comments.map(
                (com, index) =>
                  com.particle === article.id && (
                    <div key={index}>
                      <Comment
                        subStyle={0}
                        comment={com}
                        deleteComment={deleteComment}
                        setReplies={setReplies}
                        setComments={setComments}
                        comments={comments}
                        replies={replies}
                        article={article}
                      />
                    </div>
                  )
              )}
            </div>
          )}
          <ErrorHandler error={error} setError={setError} />
        </div>
      )}
    </div>
  );
};

export default ArticlePage;
