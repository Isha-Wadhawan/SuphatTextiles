const mongoose =require('mongoose');
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto') 

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Enter name "],
        maxLength : [30," 30Characters allowed only"],
        minLength  : [4, "Name should have more than 5 chars"]
    },
    email : {
        type : String,
        required : [true, "Enter email"],
        unique : true,
        validate : [validator.isEmail, "Pls enter valid email"]
    },
    password : {
        type : String,
        required : [true, "Enter password "],
        minLength : [4," password should be greater than 4 characters"],
        select : false
    },
    avatar : 
        {
            public_id : {
          type : String,
          required : true
      },
      url : {
          type : String,
          required : true
      }
      },
      role : {
        type :String,
        default : "user",
      },
      createdAt : {
        type : Date,
        default : Date.now
    },
      resetPasswordToken : String,
      resetPasswordExpire : Date,
    
})

userSchema.pre("save", async function(next){
   
   
    if(!this.isModified("password"))
    {
        next();
    }

    this.password = await bcryptjs.hash(this.password,10)
})

//JWT TOKEN


userSchema.methods.getJWTToken  = function()
{
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRE;

    const token = jwt.sign({ id: this._id }, secret, {
        expiresIn: expiresIn,
    });

    return token;
    
}

//Compare  Password

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcryptjs.compare(enteredPassword,this.password);
}


//Generating paassword reset token

userSchema.methods.getResetPasswordToken = async function(){

    //Generting token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Hashing and adding it to user Schema
  this.resetPasswordToken =  crypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex");

  this.resetPasswordExpire = Date.now() +15*60*1000;

  return resetToken;
}


module.exports = mongoose.model("User",userSchema)