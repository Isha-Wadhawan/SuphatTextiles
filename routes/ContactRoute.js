const express = require('express');
// const { submitUser } = require('../controllers/ContactController');
const {sendMailUser} = require('../controllers/ContactController')

const router = express.Router();

// router.route("/contact").post(submitUser)
router.route("/contact").post(sendMailUser)

module.exports = router