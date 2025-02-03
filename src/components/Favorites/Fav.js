import React, { Fragment } from "react";
import "./Fav.css";
import FavItemCard from "./FavItemCard.js";
import { useSelector, useDispatch } from "react-redux";
import { removeItemsFromFav } from "../../actions/favAction";
import { Link } from "react-router-dom";

const Fav = ({ history }) => {
  const dispatch = useDispatch();
  const { favItems } = useSelector((state) => state.favorites);

 

  const deleteFavItems = (id) => {
    dispatch(removeItemsFromFav(id));
  };

  return (
    <Fragment>
      {favItems.length === 0 ? (
        <div className="emptyCart">
          <div>No Product in Your Cart</div>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Your Favorites</p>
            </div>

            {favItems &&
              favItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <FavItemCard item={item} deleteFavItems={deleteFavItems} />
                </div>
              ))}
            </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Fav;

// import React, { Fragment, useEffect } from "react";
// import "./Fav.css";
// import FavItemCard from "./FavItemCard.js";
// import { useState } from "react";

// import { Link } from "react-router-dom";

// const Fav = () => {
//   const [favItems, setFavItems] = useState([]);

//   useEffect(() => {

//     const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
//     setFavItems(storedFavorites);
//     console.log("favItems:", favItems);

//   }, []);

//   const deleteFavItems = (id) => {

//     const updatedFavorites = favItems.filter((item) => item.product !== id);
//     localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
//     setFavItems(updatedFavorites);
//   };

//   return (
// <Fragment>
//       {favItems.length === 0 ? (
//         <div className="emptyCart">
//           <div>No Product in Your Favorites</div>
//           <Link to="/products">View Products</Link>
//         </div>
//       ) : (
//         <Fragment>
//           <div className="cartPage">
//             <div className="cartHeader">
//               <p>Your Favorites</p>
//             </div>

//             {favItems.map((item) => (
//               <div className="cartContainer" key={item.product}>
//                 <FavItemCard item={item} deleteFavItems={deleteFavItems} />
//               </div>
//             ))}
//           </div>
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };
// export default Fav;



