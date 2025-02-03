
import React, { Fragment, useEffect, useState } from "react";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails,newReview } from "../../actions/productAction";
import Loader from "../Layout/loader/Loader";
import { useParams } from 'react-router-dom';
import { addItemsToFav } from "../../actions/favAction";
import ReviewCard from "./ReviewCard"; 
import { Button, DialogActions, DialogContent, DialogTitle, Rating ,Dialog } from "@mui/material";
import { NEW_REVIEW_RESET } from "../../constants/productConstant";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { favItems } = useSelector((state) => state.favorites);
  const { id } = useParams();
  
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [favs, setFavs] = useState(false);

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const AddToFavsHandler = () => {
      const isInFavorites = favItems.some((item) => item.product === product._id);
  if (!isInFavorites) {
    dispatch(addItemsToFav(product._id));
  } else {
  }
  setFavs(!isInFavorites); 
};
  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert(reviewError);
      dispatch(clearErrors());
    }
    if(success){
      alert("Review submited successfully..");   
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error,success, reviewError]);

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {product && (
            <div className="ProductDetails">
              <div>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </div>

              <div>
                <div className="detailsBlock-1">
                  <h2>{product.name}</h2>
                  <p>Product # {product._id}</p>
                </div>
                <div className="detailsBlock-2">
                  <Rating {...options} />
                  ({product.numOfreviews} Reviews)
                </div>
                <div className="detailsBlock-3">
                  <div className="detailsBlock-3-1">
                    <div className="detailsBlock-3-1-1">
                      <button onClick={AddToFavsHandler} className="fav-btn"> 
                           <i className="fas fa-heart"></i>
                        {favs ? "Product Added" : "Add to Favorites"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="detailsBlock-4">
                  Description  <p>{product.description}</p><br/>
                  Fabric Type  <p>{product.fabric}</p>
                </div>

                <button onClick={submitReviewToggle} className="submitReview">
                  Submit Review
                </button>
              </div>
            </div>
          )}

<h3 className="reviewsHeading">REVIEWS</h3>

<Dialog
  aria-labelledby="simple-dialog-title"
  open={open}
  onClose={submitReviewToggle}
>
  <DialogTitle>Submit Review</DialogTitle>
  <DialogContent className="submitDialog">
    <Rating
      onChange={(e) => setRating(e.target.value)}
      value={rating}
      size="large"
    />

    <textarea
      className="submitDialogTextArea"
      cols="30"
      rows="5"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
    ></textarea>
  </DialogContent>
  <DialogActions>
    <Button onClick={submitReviewToggle} color="secondary">
      Cancel
    </Button>
    <Button onClick={reviewSubmitHandler} color="primary">
      Submit
    </Button>
  </DialogActions>
</Dialog>

          <div>
            {product.reviews && product.reviews.length > 0 ? (
              <div className="reviews">
                {product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
              </div>
            ) : (
              <p className="noReviews">No Reviews Yet</p>
            )}
          </div> 
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
