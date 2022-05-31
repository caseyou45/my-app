import { setStateUser } from "../../reducers/userReducer";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const stateStoredUser = useSelector((state) => state.user);
  useEffect(() => {
    document.addEventListener("click", handleOffClick);
    return () => {
      document.removeEventListener("click", handleOffClick);
    };
  });

  const categoryList = [
    "Science",
    "Health",
    "Entertainment",
    "Sports",
    "Business",
    "Technology",
  ];

  let history = useNavigate();
  const dispatch = useDispatch();

  const handleCategoryDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOffClick = () => {
    if (showDropdown === true) handleCategoryDropdown();
  };

  const logout = () => {
    window.localStorage.removeItem("loggedForumUser");
    dispatch(setStateUser(""));
    history.push("/signin");
  };

  return (
    <ul className={styles.navBar}>
      <li className={styles.navLeft}>
        <button
          className={styles.menuIcon}
          onClick={(event) => {
            handleCategoryDropdown();
          }}
        >
          {showDropdown === true ? <span>&#9747;</span> : <span>&#9776;</span>}
        </button>
        <div
          className={styles.dropdownContent}
          style={showDropdown ? { display: "block" } : { display: "none" }}
        >
          {/* Mobile Signin/User Info */}
          {!stateStoredUser ? (
            <Link className={styles.authItem} to="/signin">
              Sign In
            </Link>
          ) : (
            <Link
              className={styles.authItem}
              to={`/profile/${stateStoredUser.id}`}
            >
              {stateStoredUser.username}
            </Link>
          )}
          {!stateStoredUser ? (
            <Link
              className={`${styles.authItem} ${styles.buttomAuthItem}`}
              to="/signup"
            >
              Sign Up
            </Link>
          ) : (
            <Link
              className={`${styles.authItem} ${styles.buttomAuthItem}`}
              onClick={logout}
              to="/"
            >
              Log Out
            </Link>
          )}
          <Link
            className={styles.item}
            onClick={(event) => {
              handleCategoryDropdown();
            }}
            to="/"
          >
            Headlines
          </Link>
          {categoryList.map((el, index) => (
            <Link
              key={index}
              className={styles.item}
              onClick={(event) => {
                handleCategoryDropdown();
              }}
              to={`/category/${el}`}
            >
              {el}
            </Link>
          ))}
        </div>
      </li>
      <li>
        <Link className={styles.logo} to="/">
          NewsCycle
        </Link>
      </li>
      {/* Desktop Signin/User Info */}
      {!stateStoredUser ? (
        <li className={styles.navRight}>
          <Link className={styles.navButton} to="/signup">
            Sign Up
          </Link>
        </li>
      ) : (
        <li className={styles.navRight}>
          <Link className={styles.navButton} onClick={logout} to="/">
            Log Out
          </Link>
        </li>
      )}
      {!stateStoredUser ? (
        <li className={styles.navRight}>
          <Link className={styles.navButton} to="/signin">
            Sign In
          </Link>
        </li>
      ) : (
        <li className={styles.navRight}>
          <Link
            className={styles.navButton}
            to={`/profile/${stateStoredUser.username}`}
          >
            {stateStoredUser.username}
          </Link>
        </li>
      )}
    </ul>
  );
};

export default Navbar;
