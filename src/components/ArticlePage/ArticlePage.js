import axios from "axios";
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

  const [allVotes, setAllVotes] = useState([]);
  const [load, setLoad] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const match = useMatch("/article/id/:id");

  useEffect(() => {
    const getArticleandCommentsVotes = async () => {
      try {
        // Get Everything
        const article = await articleServices.articleById(match.params.id);

        // // Set Article
        setArticle(article);

        // // // Set Comments
        // setComments(
        //   combo.data.comments.filter((el) => el.parent_comment === null)
        // );
        // setReplies(
        //   combo.data.comments.filter((el) => el.parent_comment !== null)
        // );

        // // // Get Votes
        // setAllVotes(combo.data.votes);

        setLoad(true);
      } catch (error) {
        console.log(error);
      }
    };

    if (load === false) getArticleandCommentsVotes();
  }, [load, match.params.id]);

  const deleteComment = async (comment) => {
    const deleteInfo = {
      author: 5,
      content: "comment removed",
    };

    try {
      const removedComment = await commentServices.deleteCommentService(
        comment.comments_id,
        deleteInfo
      );

      if (comment.parent_comment === null) {
        let result = comments.filter(
          (el) => el.comments_id !== comment.comments_id
        );
        setComments([...result, removedComment.data]);
      }
      if (comment.parent_comment !== null) {
        let result = replies.filter(
          (el) => el.comments_id !== comment.comments_id
        );
        setReplies([...result, removedComment.data]);
      }
    } catch (error) {
      setErrorMessage(error.response.data.error);
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
                  com.parent_article === article.articles_id && (
                    <div key={index}>
                      <Comment
                        subStyle={0}
                        comment={com}
                        allVotes={allVotes}
                        setAllVotes={setAllVotes}
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
          <ErrorHandler
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        </div>
      )}
    </div>
  );
};

export default ArticlePage;
