import React, { useState } from "react";
import { useSelector } from "react-redux";

import styles from "./UserPage.module.css";
import CommentsLiked from "./SubComponents/CommentsLiked";
import ArticlesLiked from "./SubComponents/ArticlesLiked";
import CommentsMade from "./SubComponents/CommentsMade";

import { useMatch } from "react-router-dom";

const UserPage = () => {
  const [madeComments, setMadeComments] = useState(true);
  const [likedComments, setLikedComments] = useState(false);
  const [likedArticles, setLikedArticles] = useState(false);
  const stateStoredUser = useSelector((state) => state.user);
  const urlID = Number(useMatch("/profile/:id").params.id);

  const pickDisplay = (e) => {
    const { value } = e.target;
    if (value === "madeComments") {
      setMadeComments(true);
      setLikedComments(false);
      setLikedArticles(false);
    }

    if (value === "likedComments") {
      setMadeComments(false);
      setLikedComments(true);
      setLikedArticles(false);
    }

    if (value === "likedArticles") {
      setMadeComments(false);
      setLikedComments(false);
      setLikedArticles(true);
    }
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.profilePickButtons}>
        <button
          onClick={(e) => {
            pickDisplay(e);
          }}
          value="madeComments"
        >
          {stateStoredUser.users_id === urlID ? "Made Comments" : "Comments"}
        </button>
        {stateStoredUser.users_id === urlID && (
          <div>
            <button
              onClick={(e) => {
                pickDisplay(e);
              }}
              value="likedArticles"
            >
              Liked Articles
            </button>
            <button
              onClick={(e) => {
                pickDisplay(e);
              }}
              value="likedComments"
            >
              Liked Comments
            </button>
          </div>
        )}
      </div>
      {likedComments && (
        <CommentsLiked urlID={urlID} stateStoredUser={stateStoredUser} />
      )}
      {likedArticles && <ArticlesLiked />}
      {madeComments && (
        <CommentsMade urlID={urlID} stateStoredUser={stateStoredUser} />
      )}
    </div>
  );
};

export default UserPage;
