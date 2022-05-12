import React, { useEffect } from "react";

import styles from "./LoginModal.module.css";
import { NavLink } from "react-router-dom";

const ErrorHandler = ({ errorMessage, setErrorMessage }) => {
  useEffect(() => {
    errorMessage !== ""
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [errorMessage]);

  if (errorMessage === "") return <div>{null}</div>;
  else
    return (
      <div className={styles.column}>
        <div className={`${styles.modalBackground}`}>
          <div className={`${styles.modal}`}>
            <div className={`${styles.card} ${styles.column}`}>
              <button
                className={styles.escape}
                onClick={() => {
                  setErrorMessage("");
                }}
              >
                x
              </button>
              <h2>Uh oh!</h2>
              <div className={styles.message}>
                <p>Error: {errorMessage}</p>
              </div>
              <NavLink className={`${styles.navLink}`} to="/signin">
                Login
              </NavLink>
              <NavLink className={`${styles.navLink}`} to="/signup">
                Sign Up
              </NavLink>
              <NavLink className={`${styles.navLink}`} to="/burner">
                Make Burner
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
};
export default ErrorHandler;
