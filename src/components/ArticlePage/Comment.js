import React, { useState, useEffect } from "react";
import styles from "./ArticlePage.module.css";
import EditPopUp from "./EditPopUp";
import ReplyPopUp from "./ReplyPopUp";
import HandleDisplayTime from "../Utils/HandleDisplayTime";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import voteServices from "../../services/vote";
import ErrorHandler from "../ErrorHandler/ErrorHandler";

const Comment = ({ comment, subStyle, article, deleteComment }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openReply, setOpenReply] = useState(false);
  const [likesTotalForComment, setLikesTotalForComment] = useState(0);
  const [userVote, setUserVote] = useState(null);
  const [error, setError] = useState("");

  const stateStoredUser = useSelector((state) => state.user);

  useEffect(() => {
    setLikesTotalForComment(comment.likes.length);
    const vote = comment.likes.find((el) => el.author === stateStoredUser.id);
    if (vote) {
      setUserVote(vote);
    }
  }, []);

  const handleCardStyle = (x) => {
    return {
      marginTop: "1rem",
      marginBottom: "1rem",
      marginLeft: `${x}rem`,
      width: `100 - ${x}%`,
    };
  };

  const handleVote = () => {
    if (userVote === null) {
      const vote = {
        vote: 1,
        articleid: article.id,
        commentid: comment.id,
        author: stateStoredUser.id,
      };
      voteServices
        .addVoteService(vote)
        .then((response) => {
          setUserVote(response.data);
          setLikesTotalForComment(likesTotalForComment + 1);
        })
        .catch((error) => {
          setError(error);
        });
    }
    if (userVote !== null) {
      voteServices
        .removeVoteService(userVote)
        .then((response) => {
          setUserVote(null);
          setLikesTotalForComment(likesTotalForComment - 1);
        })
        .catch((error) => {
          setError(error);
        });
    }
  };

  const handleEditPopUpOpen = (event) => {
    if (checkAuth() !== true) {
      setError({ "error.response.status": 403 });
    } else {
      if (openReply) {
        setOpenReply(false);
      }
      setOpenEdit(true);
    }
  };

  const handleReplyPopUpOpen = (event) => {
    if (checkAuth() !== true) {
      setError({ "error.response.status": 403 });
    } else {
      if (openEdit) {
        setOpenEdit(false);
      }
      setOpenReply(true);
    }
  };

  const checkAuth = () => {
    if (stateStoredUser) {
      return true;
    } else return false;
  };

  const CommentButtonHanlder = () => {
    <div className={styles.commentButtons}></div>;
    if (comment.author !== stateStoredUser.id) {
      return (
        <div className={styles.commentButtons}>
          {userVote !== null ? (
            <i onClick={() => handleVote(article)}> &#9829;</i>
          ) : (
            <i onClick={() => handleVote(article)}>&#9825;</i>
          )}
          <p>{likesTotalForComment}</p>
          <button name="reply" onClick={(event) => handleReplyPopUpOpen(event)}>
            Reply
          </button>
        </div>
      );
    } else
      return (
        <div className={styles.commentButtons}>
          {userVote !== null ? (
            <i onClick={() => handleVote(article)}> &#9829;</i>
          ) : (
            <i onClick={() => handleVote(article)}> &#9825;</i>
          )}
          <p>{likesTotalForComment}</p>
          <button name="reply" onClick={(event) => handleReplyPopUpOpen(event)}>
            Reply
          </button>
          {comment.author === stateStoredUser.id && (
            <div>
              <button name="delete" onClick={(event) => deleteComment(comment)}>
                Delete
              </button>
              <button
                name="edit"
                onClick={(event) => handleEditPopUpOpen(event)}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      );
  };
  return (
    <div>
      <div style={handleCardStyle(subStyle)} className={styles.commentCard}>
        <div>
          <Link
            className={styles.navButton}
            to={`/profile/${comment.username}`}
          >
            <h3>{comment.username}</h3>
          </Link>
          <h3>{comment.username}</h3>
          <span>
            <HandleDisplayTime time={comment.date} />
          </span>
          <p className={styles.commentBody}>{comment.content}</p>
        </div>
        <CommentButtonHanlder />
        {openEdit && (
          <EditPopUp
            setOpenEdit={setOpenEdit}
            comment={comment}
            article={article}
          />
        )}
        {openReply && (
          <ReplyPopUp
            setOpenReply={setOpenReply}
            comment={comment}
            article={article}
          />
        )}
      </div>

      {comment.replies.map((el, index) => (
        <Comment
          key={index}
          subStyle={subStyle + 0.75}
          comment={el}
          deleteComment={deleteComment}
          article={article}
        />
      ))}
      <ErrorHandler error={error} setError={setError} />
    </div>
  );
};

export default Comment;
