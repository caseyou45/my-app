import React, { useState, useEffect } from "react";

import styles from "./ArticlePage.module.css";

import EditPopUp from "./EditPopUp";
import ReplyPopUp from "./ReplyPopUp";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import voteServices from "../../services/vote";

import ErrorHandler from "../ErrorHandler/ErrorHandler";

const Comment = ({
  comment,
  subStyle,
  article,
  comments,
  setComments,
  replies,
  setReplies,
  deleteComment,
}) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openReply, setOpenReply] = useState(false);

  const [voteTotalForComment, setVoteTotalForComment] = useState(0);
  const [userVote, setUserVote] = useState(null);
  const [error, setError] = useState("");

  const stateStoredUser = useSelector((state) => state.user);

  useEffect(() => {
    fetchVotes();
  }, []);

  const fetchVotes = async () => {
    const thisCommentsVotes = await voteServices.getVotesByCommentID(
      comment.id
    );
    setVoteTotalForComment(thisCommentsVotes.data.length);

    const vote = thisCommentsVotes.data.find(
      (el) => el.author === stateStoredUser.id
    );

    if (vote) {
      setUserVote(vote);
    }
  };
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
          setVoteTotalForComment(voteTotalForComment + 1);
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
          setVoteTotalForComment(voteTotalForComment - 1);
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

  const HandleDisplayTime = (date) => {
    let time;
    const now = new Date();
    const postTime = new Date(date.time);
    const diffTime = Math.abs(postTime - now);
    const diffMin = Math.ceil(diffTime / (1000 * 60));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 1) {
      time = `${diffDays} days ago`;
    }

    if (diffDays === 1) {
      time = `${diffDays} day ago`;
    }

    if (diffHours < 24) {
      time = `${diffHours} hours ago`;
      if (diffHours === 1) {
        time = `${diffHours} hour ago`;
      }
    }

    if (diffMin < 60) {
      time = `${diffMin} mins ago`;
      if (diffMin === 1) {
        time = `${diffMin} min ago`;
      }
    }

    return <span className={styles.commentTime}>Posted : {time}</span>;
  };

  const CommentButtonHanlder = () => {
    if (comment.deleted) {
      return <div className={styles.commentButtons}></div>;
    }

    if (comment.author !== stateStoredUser.id) {
      return (
        <div className={styles.commentButtons}>
          {userVote !== null ? (
            <i onClick={() => handleVote(article)}> &#9829;</i>
          ) : (
            <i onClick={() => handleVote(article)}>&#9825;</i>
          )}
          <p>{voteTotalForComment}</p>
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
          <p>{voteTotalForComment}</p>
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
          {comment.author !== 5 ? (
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
            {comment.author !== 5 && <HandleDisplayTime time={comment.date} />}
          </span>
          <p className={styles.commentBody}>{comment.content}</p>
        </div>
        <CommentButtonHanlder />
        {openEdit && (
          <EditPopUp
            setOpenEdit={setOpenEdit}
            replies={replies}
            comments={comments}
            comment={comment}
            setReplies={setReplies}
            setComments={setComments}
            article={article}
          />
        )}
        {openReply && (
          <ReplyPopUp
            setOpenReply={setOpenReply}
            replies={replies}
            comments={comments}
            comment={comment}
            setReplies={setReplies}
            setComments={setComments}
            article={article}
          />
        )}
      </div>

      {replies.map(
        (el, index) =>
          el.pcomment === comment.id && (
            <Comment
              key={index}
              subStyle={subStyle + 0.75}
              comment={el}
              deleteComment={deleteComment}
              setReplies={setReplies}
              setComments={setComments}
              comments={comments}
              replies={replies}
              article={article}
            />
          )
      )}
      <ErrorHandler error={error} setError={setError} />
    </div>
  );
};

export default Comment;
