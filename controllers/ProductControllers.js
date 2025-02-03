const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler")
const ApiFeatures = require("../utils/apifeatures")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const cloudinary = require('cloudinary')

// create product -- Admin
exports.createProduct = catchAsyncErrors( async(req,res,next)=>{

    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.images = imagesLinks;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success :true,
        product
    })
});

//Get All Products
//Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
    
    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage); // Update this line to apply pagination

    let products = await apiFeature.query;
    
    res.status(200).json({
        "success": true,
        products,
        productsCount,
        resultPerPage,
    });
});



//Get All Products  (Admin)
exports.getAdminProducts = catchAsyncErrors (async(req,res) =>{
    const products = await Product.find();
        res.status(200).json({
        "success"  :true,
        products,
    });
});

//Get product details
exports.getProductDetails = catchAsyncErrors( async(req,res , next) =>{

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product Not found",404))
    }
        res.status(200).json({
            success : true,
            product
        })
});

// Update a Product --Admin
exports.updateProduct = catchAsyncErrors( async(req,res,next) =>{

     let product = await Product.findById(req.params.id);
     if(!product){
        return res.status(500).json({success : false,
        message  : "Not found product"})
     }
     product = await Product.findByIdAndUpdate(req.params.id ,req.body , {
        new : true, 
        runValidators  :true, 
        useFindAndModify : false
    });
    res.status(200).json({
        success : true,
        product
    })

});


//Delete a product ---Admin
exports.deleteProduct = catchAsyncErrors(async(req,res,next) =>{
 const product = await Product.findById(req.params.id);

 if(!product){
    return res.status(500).json({
        status : false,
        message : "Not found product"

    }) }
  
  // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }
    await product.deleteOne();

    res.status(200).json({
        success : true,
        message   : "Product deleted successfully..."
    })

});
 

//Create new Review or update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productId);
  
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfreviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });
  

//Get all reviews of a product

exports.getProductReviews = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.query.id);

    
 if(!product){
    return next(new ErrorHandler("Product not found", 404));
 }

    res.status(200).json({
        success : true,
        reviews   : product.reviews
    });
})


//Delete Reviews
exports.deleteReview = catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.findById(req.query.productId);

 
if(!product){
 return next(new ErrorHandler("Product not found", 404));
}

const reviews = product.reviews.filter( 
 (rev) => rev._id.toString() != req.query.id.toString());



 let avg =0;
 reviews.forEach(rev =>{
     avg += rev.rating;
 })
 const ratings = avg /reviews.length
 
 const numOfreviews = reviews.length;

 await Product.findByIdAndUpdate(req.query.productId, 
     {
     reviews,ratings, numOfreviews
     },
     {
         new: true,
         runValidators : true,
         useFindAndModify :false
     }
     );
 
 res.status(200).json({
    success : true,
});
})