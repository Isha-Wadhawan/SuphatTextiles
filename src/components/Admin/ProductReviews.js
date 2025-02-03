// import React, { Fragment, useEffect, useState } from "react";
// import "./productReviews.css";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   clearErrors,
//   getAllReviews,
//   deleteReviews,
// } from "../../actions/productAction";
// import {useNavigate} from 'react-router-dom';
// import { Button } from "@material-ui/core";
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import StarPurple500Icon from '@mui/icons-material/StarPurple500';
// import SideBar from "./Sidebar";
// import { DELETE_REVIEW_RESET } from "../../constants/productConstant";

// const ProductReviews = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { error: deleteError, isDeleted } = useSelector(
//     (state) => state.review
//   );

//   const { error, reviews, loading } = useSelector(
//     (state) => state.productReviews
//   );

//   const [productId, setProductId] = useState("");

//   const deleteReviewHandler = (reviewId) => {
//     dispatch(deleteReviews(reviewId, productId));
//   };

//   const productReviewsSubmitHandler = (e) => {
//     e.preventDefault();
//     dispatch(getAllReviews(productId));
//   };

//   useEffect(() => {
//     if (productId.length === 24) {
//       dispatch(getAllReviews(productId));
//     }
//     if (error) {
//       alert(error);
//       dispatch(clearErrors());
//     }

//     if (deleteError) {
//       alert(deleteError);
//       dispatch(clearErrors());
//     }

//     if (isDeleted) {
//       alert("Review Deleted Successfully");
//       navigate("/admin/reviews");
//       dispatch({ type: DELETE_REVIEW_RESET });
//     }
//   }, [dispatch, error, deleteError, isDeleted, productId]);

//   const columns = [
//     { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

//     {
//       field: "user",
//       headerName: "User",
//       minWidth: 200,
//       flex: 0.6,
//     },

//     {
//       field: "comment",
//       headerName: "Comment",
//       minWidth: 350,
//       flex: 1,
//     },

//     {
//       field: "rating",
//       headerName: "Rating",
//       type: "number",
//       minWidth: 180,
//       flex: 0.4,

//       cellClassName: (params) => {
//         return params.getValue(params.id, "rating") >= 3
//           ? "greenColor"
//           : "redColor";
//       },
//     },

//     {
//       field: "actions",
//       flex: 0.3,
//       headerName: "Actions",
//       minWidth: 150,
//       type: "number",
//       sortable: false,
//       renderCell: (params) => {
//         return (
//           <Fragment>
//             <DeleteOutlineIcon
//               onClick={() =>
//                 deleteReviewHandler(params.getValue(params.id, "id"))
//               }
//             />
//           </Fragment>
//         );
//       },
//     },
//   ];

//   const rows = [];

//   reviews &&
//     reviews.forEach((item) => {
//       rows.push({
//         id: item._id,
//         rating: item.rating,
//         comment: item.comment,
//         user: item.name,
//       });
//     });

//   return (
//     <Fragment>

//       <div className="dashboard">
//         <SideBar />
//         <div className="productReviewsContainer">
//           <form
//             className="productReviewsForm"
//             onSubmit={productReviewsSubmitHandler}
//           >
//             <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

//             <div>
//               <StarPurple500Icon />
//               <input
//                 type="text"
//                 placeholder="Product Id"
//                 required
//                 value={productId}
//                 onChange={(e) => setProductId(e.target.value)}
//               />
//             </div>

//             <input type = "submit"
//               id="createProductBtn"
//               disabled={
//                 loading ? true : false || productId === "" ? true : false
//               }
//               value="Search"
//             />
//           </form>

//       <div className="review-table">
//       {reviews && reviews.length > 0 ? (
//         <table className="productListTable">
//           <thead>
//             <tr>
//               <th>ReviewId</th>
//               <th>User</th>
//               <th>Rating</th>
//               <th>Comment</th>
//               <th>Action</th>
//               {/* Add more columns as needed */}
//             </tr>
//           </thead>
//           <tbody>
//             {reviews.map((review, index) => (
//               <tr key={index}>
//                 <td>{review.reviewId}</td>
//                 <td>{review.user}</td>
//                 <td>{review.rating}</td>
//                 <td>{review.comment}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>) : (
//             <h1 className="productReviewsFormHeading">No Reviews Found</h1>
//           )}
//         </div>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default ProductReviews;



import React, { Fragment, useEffect, useState } from "react";
import "./productReviews.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../actions/productAction";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import SideBar from "./Sidebar";
import { DELETE_REVIEW_RESET } from "../../constants/productConstant";
import { useNavigate } from "react-router-dom";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert("Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted, productId]);

  const deleteButtonStyle = {
    color: "red", // Set color to red
    backgroundColor: "transparent", // Transparent background
    border: "none", // No border
    cursor: "pointer", // Cursor style
    outline: "none", // No outline
  };

  return (
    <Fragment>
      <div className="dashboard">
        <SideBar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <StarPurple500Icon />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <button
              id="createProductBtn"
              type="submit"
              disabled={loading || productId === ""}
            >
              Search
            </button>
          </form>

          {reviews && reviews.length > 0 ? (
            <table className="productListTable">
              <thead>
                <tr>
                  <th>Review ID</th>
                  <th>User</th>
                  <th>Comment</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr key={review._id}>
                    <td>{review._id}</td>
                    <td>{review.name}</td>
                    <td>{review.comment}</td>
                    <td>{review.rating}</td>
                    <td>
                      <button
                        onClick={() => deleteReviewHandler(review._id)}
                        style={deleteButtonStyle}
                      >
                        <DeleteOutlineIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
