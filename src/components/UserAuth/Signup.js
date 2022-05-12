import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import userService from "../../services/user";
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

  const submitSignup = async () => {
    const user = {
      username: username,
      password: password,
    };

    if (submissionCheck(user) === true) {
      try {
        //Sends request to sign up
        await userService.signup(user);

        //If signup request successful, makes a signin request
        const loggedUser = await userService.signin(user);

        //Add username to jwt that Springboot returns
        loggedUser.username = user.username;

        //saves that to localstorage
        window.localStorage.setItem(
          "loggedForumUser",
          JSON.stringify(loggedUser)
        );

        //Also saves it to state
        commentServices.setToken(loggedUser.jwt);
        voteServices.setToken(loggedUser.jwt);
        dispatch(setStateUser(loggedUser));
        console.log(loggedUser);

        history("/");
        history("/");
      } catch (error) {
        if (error.response.status === 500) {
          setMessage("Username already in use.");
        }
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
        <NavLink className={styles.navLink} to="/login">
          Login
        </NavLink>
        <NavLink className={styles.navLink} to="/burner">
          Make a Burner
        </NavLink>
      </div>
    </div>
  );
};

export default Signup;
