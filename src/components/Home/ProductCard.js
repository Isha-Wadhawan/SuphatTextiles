import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  const customRatingStyles = {
          fontSize: "17px", // Adjust this value to change the star size
        };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options}  sx={customRatingStyles}/>{" "}
        <span className="productCardSpan">
          {" "}
          ({product.numOfreviews} Reviews)
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;