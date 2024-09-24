import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";
import SignOutPage from "./components/SignOutPage";
import SignUpPage from "./components/SignUpPage";
import MainPage from "./components/MainPage";


const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route path="/signup" element={<SignUpPage setToken={setToken} />} />
        <Route
          path="/profile"
          element={
            token ? <ProfilePage token={token} /> : <Navigate to="/login" />
          }
        />
        <Route path="/signout" element={<SignOutPage setToken={setToken} />} />
      </Routes>
    </Router>
  );
};

export default App;
