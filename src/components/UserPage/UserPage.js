import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import styles from "./UserPage.module.css";
import CommentsLiked from "./SubComponents/CommentsLiked";
import CommentsMade from "./SubComponents/CommentsMade";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import userService from "../../services/user";
import { useMatch } from "react-router-dom";

const UserPage = () => {
  const [madeComments, setMadeComments] = useState(true);
  const [likedComments, setLikedComments] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState("");

  const stateStoredUser = useSelector((state) => state.user);
  const urlUsername = useMatch("/profile/:username").params.username;
  useEffect(() => {
    setUsername(stateStoredUser.username);
  }, [stateStoredUser]);

  const setUsername = async (username) => {
    const user = await userService.getUser(username);
    console.log(user);
    setUser(user);
  };

  const pickDisplay = (e) => {
    const { value } = e.target;
    if (value === "madeComments") {
      setMadeComments(true);
      setLikedComments(false);
    }

    if (value === "likedComments") {
      setMadeComments(false);
      setLikedComments(true);
    }

    if (value === "likedArticles") {
      setMadeComments(false);
      setLikedComments(false);
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
      {likedComments && user && (
        <CommentsLiked
          urlUsername={urlUsername}
          stateStoredUser={stateStoredUser}
          user={user}
        />
      )}
      {madeComments && user && (
        <CommentsMade
          urlUsername={urlUsername}
          stateStoredUser={stateStoredUser}
          user={user}
        />
      )}
      <ErrorHandler error={error} setError={setError} />
    </div>
  );
};

export default UserPage;
