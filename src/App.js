import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStateUser } from "./reducers/userReducer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/HomePage/Home";
import Login from "./components/UserAuth/Login";
import Signup from "./components/UserAuth/Signup";
import Burner from "./components/UserAuth/Burner";
import UserPage from "./components/UserPage/UserPage";
import ArticlePage from "./components/ArticlePage/ArticlePage";
import localStorageManager from "./components/Utils/localStorageManager";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const localStoredUser = localStorageManager.getUser();

    if (localStoredUser) {
      dispatch(setStateUser(localStoredUser));
    }
  }, [dispatch]);

  return (
    <div className="page-wrap">
      <Navbar />
      <Routes>
        <Route path="/profile/:id" element={<UserPage />} />
        <Route path="/article/id/:id" element={<ArticlePage />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/burner" element={<Burner />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/category/:category" element={<Home />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
