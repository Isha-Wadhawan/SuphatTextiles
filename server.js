const app = require('./app');
const dotenv = require('dotenv');
const cloudinary = require("cloudinary")
const connectDatabase = require("./config/database")
//config
dotenv.config({path:"backend/config/config.env"})

//connecting to database

connectDatabase();

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
})
// app.listen(process.env.PORT, ()=>{
app.listen( 4000,  ()=>{
    // console.log(`Server working on http://localhost:${process.env.PORT}`);
    console.log(`Server working on http://localhost:4000`);
})