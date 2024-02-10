import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ErrorHandler from "../../ErrorHandler/ErrorHandler";
import EditPopUp from "./EditPopUp";
import ReplyPopUp from "./ReplyPopUp";
import styles from "../ArticlePage.module.css";
import commentService from "../../../services/comment";
import voteServices from "../../../services/vote";
import HandleDisplayTime from "../../Utils/HandleDisplayTime";

const Comment = ({ comment, subStyle, article, fetchArticleAndComments }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openReply, setOpenReply] = useState(false);
  const [likesTotalForComment, setLikesTotalForComment] = useState(0);
  const [userVote, setUserVote] = useState(null);
  const [error, setError] = useState("");
  const stateStoredUser = useSelector((state) => state.user);

  useEffect(() => {
    setLikesTotalForComment(comment.likes.length);
    const vote = comment.likes.find((el) => el.author === stateStoredUser.id);
    if (vote) setUserVote(vote);
  }, [comment.likes, stateStoredUser.id]);

  const handleVote = async () => {
    try {
      const voteData = {
        articleID: comment.article,
        commentID: comment.id,
        author: stateStoredUser.id,
      };
      if (userVote === null) {
        const response = await voteServices.addVoteService(voteData);
        setUserVote(response.data);
        setLikesTotalForComment(likesTotalForComment + 1);
      } else {
        await voteServices.removeVoteService(userVote);
        setUserVote(null);
        setLikesTotalForComment(likesTotalForComment - 1);
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleEditPopUpOpen = () => {
    if (checkAuth()) {
      setOpenEdit(true);
      setOpenReply(false);
    } else {
      setError({ "error.response.status": 403 });
    }
  };

  const deleteComment = async () => {
    try {
      await commentService.deleteCommentService(comment);
      fetchArticleAndComments(article.id);
    } catch (error) {
      setError(error);
    }
  };

  const handleReplyPopUpOpen = () => {
    if (checkAuth()) {
      setOpenReply(true);
      setOpenEdit(false);
    } else {
      setError({ "error.response.status": 403 });
    }
  };

  const checkAuth = () => !!stateStoredUser;

  const CommentButtons = () => (
    <div className={styles.commentButtons}>
      {userVote ? (
        <i onClick={handleVote}>&#9829;</i>
      ) : (
        <i onClick={handleVote}>&#9825;</i>
      )}
      <p>{likesTotalForComment}</p>
      <button onClick={handleReplyPopUpOpen}>Reply</button>
      {comment.author === stateStoredUser.id && (
        <>
          <button onClick={deleteComment}>Delete</button>
          <button onClick={handleEditPopUpOpen}>Edit</button>
        </>
      )}
    </div>
  );

  const CardStyle = (x) => ({
    marginTop: "1rem",
    marginBottom: "1rem",
    marginLeft: `${x}rem`,
    width: `100 - ${x}%`,
  });

  return (
    <div>
      <div style={CardStyle(subStyle)} className={styles.commentCard}>
        <div>
          {!comment.deleted ? (
            <Link
              className={styles.navButton}
              to={`/profile/${comment.username}`}
            >
              <h3>{comment.username}</h3>
            </Link>
          ) : (
            <h3>{comment.username}</h3>
          )}
          <span>
            <HandleDisplayTime date={comment.date} />
          </span>
          <p className={styles.commentBody}>{comment.content}</p>
        </div>
        {!comment.deleted && <CommentButtons />}
        {openEdit && (
          <EditPopUp
            setOpenEdit={setOpenEdit}
            comment={comment}
            article={article}
            fetchArticleAndComments={fetchArticleAndComments}
          />
        )}
        {openReply && (
          <ReplyPopUp
            setOpenReply={setOpenReply}
            comment={comment}
            article={article}
            fetchArticleAndComments={fetchArticleAndComments}
          />
        )}
      </div>
      {comment.replies.map((el, index) => (
        <Comment
          key={index}
          subStyle={subStyle + 0.75}
          comment={el}
          article={article}
          fetchArticleAndComments={fetchArticleAndComments}
        />
      ))}
      <ErrorHandler error={error} setError={setError} />
    </div>
  );
};

export default Comment;
