

import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../Layout/loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from 'react-router-dom';
import Search from "./Search";
import { NavLink } from 'react-router-dom';
import Pagination from "react-js-pagination";
import {Slider, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
const categories = [
  "Co-ord Sets",
  "Bottom",
  "Tops",
  "Dresses",
];
const fabrics = [
  "Cotton",
  "Polyester",
  "Jacquard",
  "Embroidery",
  "lace",
];


const Products = ({ match }) => {
  const dispatch = useDispatch();
  const id = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [fabric, setFabric] = useState("");
  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
  } = useSelector((state) => state.products);
 
  const keyword = id.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const handleGetNowClick = () => {
    // Navigate to the "fabrics" page
    navigate('/fabrics');
  };
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
 
    dispatch(getProduct(keyword, currentPage, category, ratings, fabric));
  }, [dispatch, keyword, currentPage, category, ratings, error, fabric]);

  const showPaginationAll = productsCount > resultPerPage;
  const showPaginationFiltered = products.length > resultPerPage;
  const navigate = useNavigate();

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div title="PRODUCTS -- ECOMMERCE" />
         <h2 className="productsHeading">Products</h2>
         
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <div >
              <input type="button" 
              value="Personalize product"  
              onClick={handleGetNowClick}
              className="glow-button" />

            </div>
           <div className="seach-prod">
           <Search/>
           </div>
            <Typography>Categories</Typography>

            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            
            <Typography>Fabrics</Typography>
            <ul className="categoryBox">
              {fabrics.map((fabric) => (
                <li
                  className="category-link"
                  key={fabric}
                  onClick={() => setFabric(fabric)}
                >
                  {fabric}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

   
   {showPaginationAll && (
          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        )}

<div className="customized-products">
  <h1 className="customized-heading-main">Need Customization ? </h1>
  <h2 className="customized-heading">
    Your Imagination, Our Expertise: Customized Delights
  </h2>
  <p className="customized-description">
    Discover endless possibilities with our custom-made products. Craft your dream design, and we'll bring it to life. Personalized perfection, tailored just for you.
  </p>
  <input
    type="button"
    value="Get Now"
    onClick={handleGetNowClick}
    className="highlighted-button"
  />
</div>

  </Fragment>


      )}
    </Fragment>
  );
};

export default Products;
