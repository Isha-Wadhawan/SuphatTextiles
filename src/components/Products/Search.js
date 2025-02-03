import React, { useState, Fragment } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate



const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook to get the navigation function


  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`); // Use navigate function to navigate
    } else {
      navigate("/products"); // Use navigate function to navigate
    }
  };

  return (
    <Fragment>
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Explore Products"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;