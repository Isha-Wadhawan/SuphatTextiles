import React from "react";
import "./Sidebar.css";
import { useState } from "react";
import {FaChartLine } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

// import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [showCreateIcon, setShowCreateIcon] = useState(false);

  return (
    <div className="sidebar">
      <Link to="/">
        {/* <img src={logo} alt="Ecommerce" /> */}
      </Link>
      {/* <Link to="/admin/dashboard">
        <p>
          <div /> Dashboard
        </p>
      </Link> */}

<Link
        to="/admin/products"
        onMouseEnter={() => setShowCreateIcon(true)}
        onMouseLeave={() => setShowCreateIcon(false)}
      >
        <p>
          <FaChartLine /> Products
        </p>
        <Link
         to = "/admin/product">
        {showCreateIcon && <FaPlus className="create-icon" Create/>} 
</Link></Link>
      {/* <Link to="/admin/product">
        <p>
          <FaPlus /> 
        </p>
      </Link> */}
      <Link to="/admin/users">
        <p>
          <FaUser /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <FaComment />   Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;