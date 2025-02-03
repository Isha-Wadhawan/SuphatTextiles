const express= require('express');
const app = express();
const cookieParser = require('cookie-parser'); 
const cors = require("cors");
const bodyParser = require('body-parser')
const fileupload = require("express-fileupload")
const nodemailer = require('nodemailer');

const errorMiddleware = require("./middleware/error")

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(fileupload());

//Route Imports
const product = require("./routes/ProductRoute");
const user = require("./routes/userRoute");
const contact = require("./routes/ContactRoute");
app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",contact);


//Middleware for Errors
app.use(errorMiddleware);

module.exports = app