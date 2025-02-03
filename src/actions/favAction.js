import {
    ADD_TO_FAV,
    REMOVE_FAV_ITEM,
  
  } from "../constants/favConstant";
  import axios from "axios";
  
  // Add to Fav
  export const addItemsToFav = (id) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);
  
    dispatch({
      type: ADD_TO_FAV,
      payload: {
        product: data.product._id,
        name: data.product.name,
        image: data.product.images[0].url,
      },
    });
  
    localStorage.setItem("favItems", JSON.stringify(getState().favorites.favItems));
  };
  
  // REMOVE FROM Fav
  export const removeItemsFromFav = (id) => async (dispatch, getState) => {
    dispatch({
      type: REMOVE_FAV_ITEM,
      payload: id,
    });
  
    localStorage.setItem("favItems", JSON.stringify(getState().favorites.favItems));
  };
  