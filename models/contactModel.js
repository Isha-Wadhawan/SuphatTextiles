const mongoose = require('mongoose');

const ContactFormSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  message: String,
});

// Define a static method for creating a new contact
ContactFormSchema.statics.createContact = async function (contactData) {
  return this.create(contactData);
};

const Contact = mongoose.model('Contact', ContactFormSchema);

module.exports = Contact;
