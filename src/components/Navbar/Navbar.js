import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setStateUser } from "../../reducers/userReducer";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const stateStoredUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    const handleOffClick = () => {
      if (showDropdown) setShowDropdown(false);
    };
    document.addEventListener("click", handleOffClick);
    return () => {
      document.removeEventListener("click", handleOffClick);
    };
  }, [showDropdown]);

  const handleCategoryDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const logout = () => {
    window.localStorage.removeItem("loggedForumUser");
    dispatch(setStateUser(""));
    history("/signin");
  };

  return (
    <ul className={styles.navBar}>
      <li className={styles.navLeft}>
        <button className={styles.menuIcon} onClick={handleCategoryDropdown}>
          {showDropdown ? <span>&#9747;</span> : <span>&#9776;</span>}
        </button>
        <div
          className={styles.dropdownContent}
          style={{ display: showDropdown ? "block" : "none" }}
        >
          {!stateStoredUser ? (
            <>
              <Link className={styles.authItem} to="/signin">
                Sign In
              </Link>
              <Link
                className={`${styles.authItem} ${styles.buttomAuthItem}`}
                to="/signup"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                className={styles.authItem}
                to={`/profile/${stateStoredUser.id}`}
              >
                {stateStoredUser.username}
              </Link>
              <Link
                className={`${styles.authItem} ${styles.buttomAuthItem}`}
                onClick={logout}
                to="/"
              >
                Log Out
              </Link>
            </>
          )}
          <Link className={styles.item} onClick={handleCategoryDropdown} to="/">
            Headlines
          </Link>
          {[
            "Science",
            "Health",
            "Entertainment",
            "Sports",
            "Business",
            "Technology",
          ].map((category, index) => (
            <Link
              key={index}
              className={styles.item}
              onClick={handleCategoryDropdown}
              to={`/category/${category}`}
            >
              {category}
            </Link>
          ))}
        </div>
      </li>
      <li>
        <Link className={styles.logo} to="/">
          NewsCycle
        </Link>
      </li>
    </ul>
  );
};

export default Navbar;
