const express = require('express');
const { getAllProducts , createProduct , updateProduct , deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview, getAdminProducts} = require('../controllers/ProductControllers');

const {isAuthenticatedUser, authorizeRoles } = require("../middleware/auth")

const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router.route("/admin/product/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);

router.route("/admin/product/:id").delete(isAuthenticatedUser, authorizeRoles("admin"),deleteProduct); 
  
router.route("/product/:id").get(getProductDetails); 

router.route("/review").put(isAuthenticatedUser, createProductReview);

router.route("/reviews").get(getProductReviews);

router.route("/reviews").delete(isAuthenticatedUser,deleteReview);

router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles("admin"),  getAdminProducts);


module.exports = router