const ErrorHandler = require("../utils/errorhandler")
const User = require ('../models/userModel')
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const sendToken = require("../utils/jwtToken")
const sendEmail = require("../utils/sendEmail")
const cloudinary = require('cloudinary')

//Register a user

exports.registerUser = catchAsyncErrors(async(req,res,next)=>{

    const{name,email,password} = req.body;

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
      folder : "avatars",
      width :150,
      crop : "scale",
    });

    const user = await User.create({
        name,email,password,
        avatar : {
            public_id: myCloud.public_id,
            url : myCloud.secure_url,
        },
    });

  sendToken(user, 201 ,res);

})

//Login user

exports.loginUser = catchAsyncErrors(async(req,res,next)=>{

    const {email, password} = req.body;

    //Check if user has given pass and email both
    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password",400));
    } 
    
   const user = await User.findOne({email}).select("+password");
    
   if(!user){
    return next(new ErrorHandler("Invalid Email or Password",401));
   }

   const isPasswordMatched = await user.comparePassword(password);

   if(!isPasswordMatched){
    return next(new ErrorHandler("Invalid Email or Password",401));
  }

  sendToken(user, 200 ,res);


})

//Logout

exports.logout = catchAsyncErrors(async (req,res,next)=>{

  res.cookie("token",null, {
    expires : new Date(Date.now()),
    httpOnly : true
  });
  res.status(200).json({
    success  :true,
    message :  " Logged out successfully ..."
  })
});

//Forgot Password

exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{

  const user = await User.findOne({email : req.body.email});

  if(!user){
      return next(new ErrorHandler("User not found",404));
  }
  
  //Get Reset Password Token
   const resetToken = user.getResetPasswordToken();

   await user.save({validateBeforeSave : false});

   const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

   const message = `Your password reset token is  :- \n\n  ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it`;

   try{
 
     await sendEmail({

      email : user.email,
      subject : `Ecommerce password Recovery`,
      message,
     });

     res.status(200).json({
      success : true,
      message : `Email sent to ${user.email} successfully`
     })
   }
   catch(error){
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({validateBeforeSave : false});

    return next(new ErrorHandler(error.message,500));
  }


})


//Reset Password 

exports.resetPassword = catchAsyncErrors(async (req,res,next)=>{
 

  //Creating token hash
  const resetPasswordToken =  crypto
  .createHash("sha256")
  .update(req.params.token)
  .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire : { $gt  : Date.now()},
  });

  if(!user){
    return next(new ErrorHandler("Reset password token invalid or had been expired",400));
}

if(req.body.password != req.body.confirmPassword){
  return next(new ErrorHandler("Password does not match",400));
}

user.password = req.body.password;
user.resetPasswordToken = undefined;
user.resetPasswordExpire = undefined;

await user.save();

sendToken(user ,200, res);
})
 

//Get User Details

exports.getUserDetails = catchAsyncErrors(async (req,res,next) => {

   const user = await User.findById(req.user.id);

   res.status(200).json({
    success : true,
    user
   })

})

// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

//Update User Profile
exports.updateProfile = catchAsyncErrors(async (req,res,next) => {

   const newUserData = {
    name : req.body.name,
    email : req.body.email,

   };

   if( req.body.avatar !== ""){
   const user = await User.findById(req.user.id);

   const imageId = user.avatar.public_id;

   await cloudinary.v2.uploader.destroy(imageId);
   
   const mycloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
    folder : "avatars",
    width : 150,                     
    crop : "scale",
  });

   newUserData.avatar = {
      public_id: mycloud.public_id,
      url : mycloud.secure_url
   }
   } 
   const user = await User.findByIdAndUpdate(req.user.id , newUserData, {

    new :true, 
    runValidators : true,
    useFindAndModify : false,
   });

res.status(200).json({
  success : true,

})

})


//Get all Users ---Admin
exports.getAllUser = catchAsyncErrors(async(req,res,next)=>{

  const users = await User.find();

  res.status(200).json({
    success : true,
    users
  })
})


//Get single Users ---Admin
exports.getSingleUser = catchAsyncErrors(async(req,res,next)=>{

  const user = await User.findById(req.params.id);

  if(!user){
    return next(new ErrorHandler(`User does not exist with Id : ${req.params.id}`))
  }

  res.status(200).json({
    success : true,
    user
  })

})


//Update User Role --Admin
exports.updateRole = catchAsyncErrors(async (req,res,next) => {

  const newUserData = {
   name : req.body.name,
   email : req.body.email,
   role : req.body.role

  }
  const user = await User.findByIdAndUpdate(req.params.id , newUserData, {
   new :true,
   runValidators : true,
   useFindAndModify : false,
  });

res.status(200).json({
 success : true,

})
})


//Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req,res,next) => {

 const user = await User.findById(req.params.id);

 if(!user){
  return next(new ErrorHandler(`User does not exist with Id : ${req.params.id}`))
}


const imageId = user.avatar.public_id;

await cloudinary.v2.uploader.destroy(imageId);

await user.deleteOne();

res.status(200).json({
  success : true,
})


res.status(200).json({
 success : true,
 message : "User deleted successfully..."

})
})