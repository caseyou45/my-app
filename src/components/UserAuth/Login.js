import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setStateUser } from "../../reducers/userReducer";
import userServices from "../../services/user";
import commentServices from "../../services/comment";
import voteServices from "../../services/vote";

import styles from "./UserAuth.module.css";

const Login = () => {
  let history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const setLocalAuth = (loggedUser) => {
    window.localStorage.setItem("loggedForumUser", JSON.stringify(loggedUser));

    dispatch(setStateUser(loggedUser));

    history("/");
  };

  const submitSignIn = async () => {
    const user = {
      username: username,
      password: password,
    };

    try {
      const loggedUser = await userServices.signin(user);
      commentServices.setToken(loggedUser.jwt);
      voteServices.setToken(loggedUser.jwt);
      userServices.setToken(loggedUser.jwt);

      setLocalAuth(loggedUser);
    } catch (error) {
      setMessage(error.response.data);
    }
  };

  return (
    <div className={styles.column}>
      <div className={`${styles.form} ${styles.card} ${styles.column}`}>
        <h2>Sign In</h2>
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
        <div className={styles.message}>
          {message !== "" && <p>Error: {message}</p>}
        </div>
        <button className={styles.navButton} onClick={submitSignIn}>
          Sign In
        </button>
        <NavLink className={styles.navLink} to="/signup">
          Sign Up
        </NavLink>

        <NavLink className={styles.navLink} to="/burner">
          Make a Burner
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
