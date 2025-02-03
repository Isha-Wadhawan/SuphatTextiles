import React, { useState } from "react";
import './ContactUs.css';
const PopupForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Access formData.email and formData.message to use the form data
    console.log("Form Data:", formData);

    // You can perform further actions with the form data here

    // Clear the form fields after submission if needed
    setFormData({
      email: "",
      message: "",
    });
  };

  return (
    <div className="popup-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />

        <label htmlFor="message">Message:</label>
        <input
          type="text"
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
        />

        <button type="submit">Submit</button>
      </form>
      <button className="close-button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default PopupForm;
