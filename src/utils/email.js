const nodemailer = require('nodemailer');
const { CONSTANTS } = require('../config');

const sendEmail = async options => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: CONSTANTS.EMAIL.EMAIL_HOST,
    port: CONSTANTS.EMAIL.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // 2) Define the email options
  const mailOptions = {
    from: options.from,
    to: options.to,
    subject: options.subject,
    text: options.message,
    html: options.html
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

