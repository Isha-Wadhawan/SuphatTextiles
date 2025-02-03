

import React from "react";
// import playStore from "../../../images/playstore.png";
// import appStore from "../../../images/Appstore.png";
import {Link} from 'react-router-dom'

import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Call Us</h4>
        <p>+(66)890070719</p>
        <p><Link to = "/about">About us</Link></p>
        <p><Link to = "/services">Services</Link></p>
      </div>

      <div className="midFooter">
        <h1>SUPHAT TEXTILE</h1>
        <p>High Quality is our first priority</p>

        <p>&copy; {new Date().getFullYear()} Suphat Textile. All Rights Reserved</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="http://instagram.com/suphatTextile">Instagram</a>
        <a href="http://instagram.com/suphatTextile">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;