
// Import necessary modules and dependencies
const nodemailer = require('nodemailer');
const Contact = require('../models/contactModel'); // Import your Mongoose model
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
// const sendEmail = require('../utils/sendEmail');



// Define the sendThankYouEmail function outside of the submitUser route handler
// const sendThankYouEmail = (user, res) => {
//   // Configure your email content
//   const mailOptions = {
//     from: 'ishawadhawan3@gmail.com',
//     to: user.email, // User's email
//     subject: 'Thank You for Contacting Us',
//     text: `Hello ${user.name},\n\nThank you for contacting us. We've received your message and will get back to you as soon as possible.\n\nBest regards,\nYour Company Name`,
//   };

const sendMail = async (name, email, phone, message) => {
  // Create a transporter to send the email
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'kianna.vandervort55@ethereal.email',
      pass: 'ngeXUBT2bK4veeNbhh'
    },
  });

  // Send the thank you email
  const info = await transporter.sendMail({
    from: 'Owner House "<suphat@mail.com>"',
    to: `${email}`,
    subject: 'Thank You for Contacting Us',
    text: `Hello ${name},\n\nThank you for contacting us. We've received your message and will get back to you as soon as possible.\n\nBest regards,\nYour Company Name`,
    html: '<p>hi users</p>'
  })
  console.log(info.messageId)
}
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log('Error sending email:', error);
//       res.status(500).send('Error sending email');
//     } else {
//       console.log('Email sent:', info.response);
//       res.status(200).send('Email sent successfully');
//     }
//   });
// };



// exports.submitUser = catchAsyncErrors(async (req, res, next) => {

// try {
//     const { name, email, phone, message } = req.body;

//     // Create a new document based on your Mongoose model
//     const contact = new Contact({ name, email, phone, message });

//     // Save the document to MongoDB
//     await contact.save();

//     // Send the thank you email
//     sendThankYouEmail({ name, email }, res);

//     // Respond with success
//     res.status(200).send('Form submitted successfully');

//   } catch (error) {
//     // Handle errors appropriately
//     next(error);
//   }
// });

const sendMailUser = async(req, res) => {
  const {name, email, phone, message} = req.body;
  // const contact = new Contact({name, email, phone, message})
  // const response = await contact.save();
  await sendMail(name, email, phone, message)
}

exports.sendMailUser = catchAsyncErrors(async (req, res, next) => {

try {
    // const { name, email, phone, message } = req.body;

    // Create a new document based on your Mongoose model
    // const contact = new Contact({ name, email, phone, message });

    // Save the document to MongoDB
    // await contact.save();

    // Send the thank you email
    // sendThankYouEmail({ name, email }, res);

    // Respond with success
    res.status(200).send('Form submitted successfully');

  } catch (error) {
    // Handle errors appropriately
    next(error);
  }
});