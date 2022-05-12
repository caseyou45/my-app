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
  allVotes,
  comments,
  setComments,
  replies,
  setReplies,
  deleteComment,
  setAllVotes,
}) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openReply, setOpenReply] = useState(false);

  const [voteTotalForComment, setVoteTotalForComment] = useState(0);
  const [userVote, setUserVote] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const stateStoredUser = useSelector((state) => state.user);

  useEffect(() => {
    const thisCommentsVotes = allVotes.filter(
      (el) => el.comments_id === comment.comments_id
    );

    setVoteTotalForComment(thisCommentsVotes.length);

    const vote = allVotes.find(
      (el) =>
        el.comments_id === comment.comments_id &&
        el.author === stateStoredUser.users_id
    );
    if (vote) {
      setUserVote(vote);
    }
  }, [allVotes, comment.comments_id, stateStoredUser.users_id]);

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
        articles_id: article.articles_id,
        comments_id: comment.comments_id,
        author: stateStoredUser.users_id,
      };
      voteServices
        .addVoteService(vote)
        .then((response) => {
          setUserVote(response.data[0]);
          setVoteTotalForComment(voteTotalForComment + 1);
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
        });
    }
    if (userVote !== null) {
      voteServices
        .removeVoteService(userVote.votes_id)
        .then((response) => {
          setUserVote(null);
          setVoteTotalForComment(voteTotalForComment - 1);
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
        });
    }
  };

  const handleEditPopUpOpen = (event) => {
    if (checkAuth() !== true) {
      setErrorMessage("You are not logged in.");
    } else {
      if (openReply) {
        setOpenReply(false);
      }
      setOpenEdit(true);
    }
  };

  const handleReplyPopUpOpen = (event) => {
    if (checkAuth() !== true) {
      setErrorMessage("You are not logged in.");
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
    if (comment.author === 5) {
      return <div className={styles.commentButtons}></div>;
    }

    if (comment.author !== stateStoredUser.users_id) {
      return (
        <div className={styles.commentButtons}>
          {userVote !== null ? (
            <i
              onClick={() => handleVote(article)}
              className="lni lni-lg lni-heart-filled"
            ></i>
          ) : (
            <i
              onClick={() => handleVote(article)}
              className="lni lni-lg lni-heart"
            ></i>
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
            <i
              onClick={() => handleVote(article)}
              className="lni lni-lg lni-heart-filled"
            ></i>
          ) : (
            <i
              onClick={() => handleVote(article)}
              className="lni lni-lg lni-heart"
            ></i>
          )}
          <p>{voteTotalForComment}</p>
          <button name="reply" onClick={(event) => handleReplyPopUpOpen(event)}>
            Reply
          </button>
          {comment.author === stateStoredUser.users_id && (
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
            to={`/profile/${comment.users_id}`}
          >
            <h3>{comment.username}</h3>
          </Link>
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
          />
        )}
      </div>

      {replies.map(
        (el, index) =>
          el.parent_comment === comment.comments_id && (
            <Comment
              key={index}
              subStyle={subStyle + 0.75}
              comment={el}
              allVotes={allVotes}
              setAllVotes={setAllVotes}
              deleteComment={deleteComment}
              setReplies={setReplies}
              setComments={setComments}
              comments={comments}
              replies={replies}
              article={article}
            />
          )
      )}
      <ErrorHandler
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default Comment;
