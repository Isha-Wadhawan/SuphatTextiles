const mongoose = require('mongoose');


const connectDatabase = () =>{

    // mongoose.connect(process.env.DB_URI, {useNewUrlParser : true, useUnifiedTopology : true})
    mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce", {useNewUrlParser : true, useUnifiedTopology : true})
    .then(()=>{console.log("DB connected")})
    .catch((err)=>{console.log(err);})
}

module.exports = connectDatabase