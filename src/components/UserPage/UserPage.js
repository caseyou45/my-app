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
  const urlUsername = useMatch("/profile/:username").params.username;

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
          {stateStoredUser.username === urlUsername
            ? "Made Comments"
            : "Comments"}
        </button>
        {stateStoredUser.username === urlUsername && (
          <div>
            {/* <button
              onClick={(e) => {
                pickDisplay(e);
              }}
              value="likedArticles"
            >
              Liked Articles
            </button> */}
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
        <CommentsLiked
          urlUsername={urlUsername}
          stateStoredUser={stateStoredUser}
        />
      )}
      {/* {likedArticles && <ArticlesLiked />} */}
      {madeComments && (
        <CommentsMade
          urlUsername={urlUsername}
          stateStoredUser={stateStoredUser}
        />
      )}
    </div>
  );
};

export default UserPage;
