const express = require('express');
const { sendEmail } = require('../Controllers/emailsRoutes');

const emailRouter = express.Router();

emailRouter.route('/mail')
  .post(sendEmail);

module.exports = emailRouter;