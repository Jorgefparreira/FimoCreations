const functions = require('firebase-functions');
const cors = require('cors')({ origin: 'https://lilfimokeyrings.web.app' });
const nodemailer = require('nodemailer');

const gmailEmail = functions.config().mail.id;
const gmailPassword = functions.config().mail.appkey;
const mailAdmin = functions.config().mail.admin;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});
exports.handler = async function (req, res) {
  await cors(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    const { name, email, message } = req.body;

    const mailOptions = {
      from: gmailEmail,
      to: mailAdmin, 
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
      await mailTransport.sendMail(mailOptions);
      console.log('Email sent successfully');
      res.status(200).send('Email sent successfully');
    } catch (error) {
      console.error('There was an error while sending the email:', error);
      res.status(500).send('Internal Server Error');
    }
  })
}