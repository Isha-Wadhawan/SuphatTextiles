
// Header.js

import React from 'react';
import './Header.css'
import {Link} from 'react-router-dom'

    const Header = () => {
    return (
    <div className="header">
         <div className="main-nav">
        <div className="logo">
          <h2>
            <span>S</span>UPHAT
            <span>T</span>EXTILE
          </h2>
        </div>
        </div>

       
        <div className="nav">
        
             <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/search"></Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
         
        </div>
      </div>
    );
    };

export default Header;
