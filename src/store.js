import { legacy_createStore as createStore ,combineReducers, applyMiddleware} from 'redux' ;
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { ProductsReducer, newProductReducer, productReducer } from './reducers/ProductReducer';
import { productDetailsReducer, newReviewReducer, reviewReducer, productReviewsReducer} from './reducers/ProductReducer';
import { allUsersReducer, profileReducer, userDetailsReducer, userReducer } from './reducers/userReducer';
import { favReducer } from './reducers/favReducer';

const reducer = combineReducers({
  products: ProductsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  favorites: favReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allUsers: allUsersReducer,
  newReview: newReviewReducer,
  review: reviewReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
});


let initialState = {
  user: {
    isAuthenticated: false, // Initialize to false when the app starts
    user: null, // Initialize user data to null
    },
  fav : {
    favItems : localStorage.getItem("favItems")
    ? JSON.parse(localStorage.getItem("favItems")) : [],
  },
};
const middleware = [thunk];

const store = createStore(
    reducer, 
    initialState , 
    composeWithDevTools(applyMiddleware(...middleware)));

    export default store;