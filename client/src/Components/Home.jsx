import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import '../Home.css'; // Importing the CSS file
import axios from "axios";

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
          <img
            src="https://c8.alamy.com/comp/2BRP5W7/e-commerce-human-shopping-online-concept-on-computer-from-screen-people-exchanging-goods-and-money-on-computers-delivery-at-home-concept-social-di-2BRP5W7.jpg"
            alt="People exchanging goods online"
            className="exchange-image"
          />
          <div className="welcome-text">
            <h1>Welcome to Eco Thread Exchange</h1>
            <p>
              In today's fast-paced world, the fashion industry has become one of the largest contributors to environmental pollution, with millions of tons of plastic discarded every year. To address this growing concern, Exchange provides a platform where users can exchange their pre-loved clothing and accessories.
            </p>
            <p>
              Exchange is a web-based application developed using modern technologies that allows users to exchange their gently used clothing. It connects users who are interested in swapping their clothes, promoting usability and recycling. By reducing the production of new items, we can significantly reduce waste.
            </p>
            <p>
              How to use our platform:
              <ol>
                <li>Register on the platform using your email and password.</li>
                <li>Log in to access the homepage.</li>
                <li>Browse the "Items" page to see items listed by other users.</li>
                <li>View item details and propose a trade.</li>
                <li>If the other user accepts your trade proposal, the items will be exchanged, and the trade will be completed.</li>
              </ol>
            </p>

          </div>
        </div>
      </div>
    </>
  );
};

export default Home;