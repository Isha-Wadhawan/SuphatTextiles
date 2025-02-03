import React, { useState } from "react";
import axios from "axios";
import './ContactUs.css';
import { FaAddressBook } from "react-icons/fa";
import { FaVoicemail } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
const [user, setUser] = useState({
    name: "",
    email: "",
    message: "",
  });
  
    const navigate = useNavigate()
  return (
    <>
  

    <div className="contact-container">
    
    <img src="purple.png" className="square" alt="" />
    <div className="form">
      <div className="contact-info">
        <h3 className="title">FIND US</h3>
        <div className="contact-info">
          <div className="contact-information">
            <img src="location.png" className="icon" alt="" />
          <FaAddressBook style={{ fontSize: '4em', paddingRight : "7px" }}/>  <p>Address: 1040/22-23 Sukumvit 44/2 Sukumvit Rd Phrakhanong, Klongtoey, Bangkok</p>
          </div>
          <div className="contact-information">
            <img src="email.png" className="icon" alt="" />
            <p>Email: Kapil@shuphatfashiom.com</p>
          </div>
          <div className="contact-information">
            <img src="phone.png" className="icon" alt="" />
            <p>Mobile: (+66)8-9007-0719, (+66)2-713-6264</p>
          </div>
        </div>
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.096232660151!2d100.59191827421745!3d13.712621098201128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29fbf02e3e9db%3A0x731b5e540ae5e7da!2sibis%20Styles%20Bangkok%20Sukhumvit%20Phra%20Khanong!5e0!3m2!1sen!2sin!4v1692804264556!5m2!1sen!2sin"
            width={300}
            height={200}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="contact-social-media">
          <p>Connect with us:</p>
          <div className="contact-social-icons">
            <a href="#">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="#">
              <i className="fab fa-twitter" />
            </a>
            <a href="#">
              <i className="fab fa-instagram" />
            </a>
            <a href="#">
              <i className="fab fa-linkedin-in" />
            </a>
          </div>
        </div>
      </div>
      <div className="contact-form">
        <span className="circle one" />
        <span className="circle two" />
        <form autoComplete="off">
          <h3 className="title">Contact us</h3>
          <div className="input-container">
            <input type="text" name="name" className="input" placeholder="Username"/>
            <label htmlFor="name"></label>
          </div>
          <div className="input-container">
            <input type="email" name="email" className="input" placeholder="Email"/>
            <label htmlFor="email"></label>
          </div>
          <div className="input-container">
            <input type="tel" name="phone" className="input" placeholder="Phone no"/>
            <label htmlFor="phone"></label>
            <span>Phone</span>
          </div>
          <div className="input-container textarea">
            <textarea name="message" className="input" placeholder="Message"/>
            <label htmlFor="message"></label>
            <span>Message</span>
          </div>
          <input type="submit" defaultValue="Send" className="btn" onSubmit={navigate('/')}/>
        </form>
      </div>
    </div>
  </div>
  </>
  )
}; 

export default Contact ;