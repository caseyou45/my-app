import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import styles from "./LoginModal.module.css";
import { NavLink } from "react-router-dom";

const ErrorHandler = ({ error, setError }) => {
  const stateStoredUser = useSelector((state) => state.user);
  const [showReviseButton, setShowReviseButton] = useState(false);
  const [errorDisplay, setErrorDisplay] = useState("");

  useEffect(() => {
    const setErrorState = () => {
      if (error.response && error.response.status === 400) {
        setErrorDisplay(
          "Your comment violated our community standards. Please Revise."
        );
        setShowReviseButton(true);
      } else if (
        error.response &&
        error.response.status === 403 &&
        stateStoredUser.username.startsWith("burner")
      ) {
        setErrorDisplay("Burner Account Has Expired");
      } else if (stateStoredUser === "") {
        setErrorDisplay("Please Log In");
      } else {
        setErrorDisplay("Something Went Wrong");
      }
    };

    const handleBodyOverflow = () => {
      if (error === "") {
        document.body.style.overflow = "auto";
      } else {
        document.body.style.overflow = "hidden";
      }
    };

    handleBodyOverflow();
    setErrorState();
  }, [error, stateStoredUser]);

  if (error === "") return <div>{null}</div>;
  else
    return (
      <div className={styles.column}>
        <div className={`${styles.modalBackground}`}>
          <div className={`${styles.modal}`}>
            <div className={`${styles.card} ${styles.column}`}>
              <button
                className={styles.escape}
                onClick={() => {
                  setError("");
                }}
              >
                x
              </button>
              <h2>Uh oh!</h2>
              <div className={styles.message}>
                <p>Error: {errorDisplay}</p>
              </div>
              {showReviseButton ? (
                <button
                  className={`${styles.navLink}`}
                  onClick={() => {
                    setError("");
                  }}
                >
                  Close To Revise
                </button>
              ) : (
                <>
                  <NavLink className={`${styles.navLink}`} to="/signin">
                    Login
                  </NavLink>
                  <NavLink className={`${styles.navLink}`} to="/signup">
                    Sign Up
                  </NavLink>
                  <NavLink className={`${styles.navLink}`} to="/burner">
                    Make Burner
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
};
export default ErrorHandler;
