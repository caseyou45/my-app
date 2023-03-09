import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import userServices from "../../services/user";
import commentServices from "../../services/comment";
import voteServices from "../../services/vote";

import { useDispatch } from "react-redux";
import { setStateUser } from "../../reducers/userReducer";
import styles from "./UserAuth.module.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  let history = useNavigate();

  const dispatch = useDispatch();

  const setLocalAuth = (loggedUser) => {
    window.localStorage.setItem("loggedForumUser", JSON.stringify(loggedUser));

    dispatch(setStateUser(loggedUser));

    history("/");
  };

  const submitSignup = async () => {
    const user = {
      username: username,
      password: password,
    };

    if (submissionCheck(user) === true) {
      try {
        const loggedUser = await userServices.signup(user);
        console.log(loggedUser);

        commentServices.setToken(loggedUser.accessToken);
        voteServices.setToken(loggedUser.accessToken);

        setLocalAuth(loggedUser);
      } catch (error) {
        setMessage(error.response.data);
      }
    }
  };

  const submissionCheck = (user) => {
    // if (user.password.length < 8) {
    //   setMessage("Password Must 8+ Characters");
    //   return false;
    // }

    if (password !== confirmPassword) {
      setMessage("Password Must Match");
      return false;
    }

    return true;
  };

  return (
    <div className={styles.column}>
      <div className={`${styles.form} ${styles.card} ${styles.column}`}>
        <h2>Sign Up</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confim Password"
          value={confirmPassword}
          onChange={(e) => {
            setconfirmPassword(e.target.value);
          }}
        />
        <div className={styles.message}>
          {message !== "" && <p>Error: {message}</p>}
        </div>
        <button className={styles.navButton} onClick={submitSignup}>
          Sign Up
        </button>
        <NavLink className={styles.navLink} to="/signin">
          Sign In
        </NavLink>
        <NavLink className={styles.navLink} to="/burner">
          Make a Burner
        </NavLink>
      </div>
    </div>
  );
};

export default Signup;
