import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import userServices from "../../services/user";
import commentServices from "../../services/comment";
import voteServices from "../../services/vote";

import { useDispatch } from "react-redux";
import { setStateUser } from "../../reducers/userReducer";
import styles from "./UserAuth.module.css";

const Burner = () => {
  const [message, setMessage] = useState("");

  let history = useNavigate();

  const dispatch = useDispatch();

  const submitSignup = async () => {
    const makeUsername = (length) => {
      let result = "";
      let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    };

    const user = {
      username: `burner-${makeUsername(8)}`,
      password: makeUsername(20),
    };

    try {
      await userServices.signup(user);

      let loggedUser;

      try {
        loggedUser = await userServices.signin(user);
      } catch (error) {
        setMessage(error);
      }

      commentServices.setToken(loggedUser.jwt);
      voteServices.setToken(loggedUser.jwt);

      let userDetails;

      try {
        userDetails = await userServices.details(user.username);

        loggedUser.username = user.username;
        loggedUser.id = userDetails.id;
      } catch (error) {
        setMessage(error);
      }

      window.localStorage.setItem(
        "loggedForumUser",
        JSON.stringify(loggedUser)
      );

      dispatch(setStateUser(loggedUser));
      history("/");
    } catch (error) {
      setMessage(error);
    }
  };

  return (
    <div className={styles.column}>
      <div className={`${styles.form} ${styles.card} ${styles.column}`}>
        <h2>Make A Burner</h2>
        <div className={styles.info}>
          <p>This account will last 24 hours.</p>
          <p>You can still vote, like, and comment.</p>
        </div>
        <div className={styles.burnerMessage}>
          {message !== "" && <p>Error: {message}</p>}
        </div>

        <button className={styles.navButton} onClick={submitSignup}>
          Make Burner
        </button>

        <NavLink className={styles.navLink} to="/signup">
          Create Account
        </NavLink>
      </div>
    </div>
  );
};

export default Burner;
