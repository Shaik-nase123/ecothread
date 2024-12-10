import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import "../DashBoard.css"; // Link to the CSS file

const DashBoard = () => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/verify", { withCredentials: true })
      .then((res) => {
        if (res.data.status) {
          setAuthorized(true);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error("Verification failed:", err);
        navigate("/login");
      });
  }, [navigate]);

  if (!authorized) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
       
        <h3 className="section-heading">Recommended Items</h3>
        <div className="items-grid">
          <div className="item-card">
            <img src="https://i.etsystatic.com/5560419/r/il/f574d4/1265026643/il_fullxfull.1265026643_bed2.jpg" alt="Levis Jeans" />
            <h4>Levis Jeans, 2 Years Old</h4>
            <p>Posted: 2nd Jan 2024</p>
            <p>Preferences: Jeans, Jackets</p>
            <a href="#">Trade Offers (10)</a>
          </div>
          <div className="item-card">
            <img src="https://i.etsystatic.com/5560419/r/il/f574d4/1265026643/il_fullxfull.1265026643_bed2.jpg" alt="Levis Jeans" />
            <h4>Levis Jeans, 2 Years Old</h4>
            <p>Posted: 2nd Jan 2024</p>
            <p>Preferences: Jeans, Jackets</p>
            <a href="#">Trade Offers (10)</a>
          </div>
          <div className="item-card">
            <img src="https://i.etsystatic.com/5560419/r/il/f574d4/1265026643/il_fullxfull.1265026643_bed2.jpg" alt="Levis Jeans" />
            <h4>Levis Jeans, 2 Years Old</h4>
            <p>Posted: 2nd Jan 2024</p>
            <p>Preferences: Jeans, Jackets</p>
            <a href="#">Trade Offers (10)</a>
          </div>
          <div className="item-card">
            <img src="https://i.etsystatic.com/48010045/r/il/5fbf4e/5495862540/il_fullxfull.5495862540_aq0j.jpg" alt="Lilac Purse" />
            <h4>Lilac Purse from Canada</h4>
            <p>Posted: 5th Dec 2023</p>
            <p>Preferences: Shoes, Bags</p>
            <a href="#">Trade Offers (5)</a>
          </div>
        </div>

        <h3 className="section-heading">My Trades</h3>
        <div className="items-grid">
          <div className="item-card">
            <img src="https://www.ledwatcher.com/wp-content/uploads/2017/08/AmazonBasics-AA-Rechargeable-914x1024.jpg" alt="Rechargeable Batteries" />
            <h4>Rechargeable Batteries, 1 Year Old</h4>
            <p>Posted: 1st Mar 2023</p>
            <p>Preferences: Phones, Headphones</p>
            <a href="#">Trade Offers (2)</a>
          </div>
          <div className="item-card">
            <img src="https://www.ginnys.com/dw/image/v2/BBVM_PRD/on/demandware.static/-/Sites-colony-master-catalog/default/dw07897160/large/sub_19/754123_thumb_crop.png?sw=1500&sh=1500&sm=fit" alt="Denim Jacket" />
            <h4>Denim Jeans, Lee Cooper XL</h4>
            <p>Posted: 1st Oct 2023</p>
            <p>Preferences: Shirts, Jackets</p>
            <a href="#">Trade Offers (8)</a>
          </div>
          <div className="item-card">
            <img src="https://www.ginnys.com/dw/image/v2/BBVM_PRD/on/demandware.static/-/Sites-colony-master-catalog/default/dw07897160/large/sub_19/754123_thumb_crop.png?sw=1500&sh=1500&sm=fit" alt="Denim Jacket" />
            <h4>Denim Jeans, Lee Cooper XL</h4>
            <p>Posted: 1st Oct 2023</p>
            <p>Preferences: Shirts, Jackets</p>
            <a href="#">Trade Offers (8)</a>
          </div>
          <div className="item-card">
            <img src="https://www.ginnys.com/dw/image/v2/BBVM_PRD/on/demandware.static/-/Sites-colony-master-catalog/default/dw07897160/large/sub_19/754123_thumb_crop.png?sw=1500&sh=1500&sm=fit" alt="Denim Jacket" />
            <h4>Denim Jeans, Lee Cooper XL</h4>
            <p>Posted: 1st Oct 2023</p>
            <p>Preferences: Shirts, Jackets</p>
            <a href="#">Trade Offers (8)</a>
          </div>
        </div>
        <footer className="dashboard-footer">
          Threads2Thrift, All rights reserved. 2024
        </footer>
      </div>
    </>
  );
};

export default DashBoard;
