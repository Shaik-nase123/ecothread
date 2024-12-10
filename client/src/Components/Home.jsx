import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import '../Home.css'; // Importing the updated CSS file

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Sending logout request...");
    axios
      .get("http://localhost:3000/auth/logout", { withCredentials: true })
      .then((res) => {
        console.log("Logout response:", res.data);
        if (res.data?.status) {
          console.log("Logout successful. Navigating to login...");
          navigate("/login");
        } else {
          console.error("Failed to log out: Invalid response");
          navigate("/login"); // Fallback
        }
      })
      .catch((err) => {
        console.error("Logout failed:", err.message || err);
        navigate("/login"); // Fallback
      });
  };

  return (
    <>
      <Navbar onLogout={handleLogout} />
      <div className="home-container">
        <div className="home-welcome-section">
          <h2 className="home-heading">Welcome to Threads&Thrift</h2>
          <p className="home-description">
            Explore and trade your favorite items here! Use the navigation bar above to get started.
          </p>
          <button className="home-logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
