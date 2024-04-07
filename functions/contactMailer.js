const cors = require('cors')({ origin: 'https://lilfimokeyrings.web.app' });
const nodemailer = require('nodemailer');
const functions = require('firebase-functions');
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  service: 'gmail',
  auth: {
    user: functions.config().mail.id,
    pass: functions.config().mail.appkey
  }
});
exports.handler = function (req, res) {
  cors(req, res, () => {
    if(req.body.name && req.body.email){
      const mailOpts = {
        from: `${req.body.email}`,
        to: functions.config().mail.id,
        subject: 'New message from contact form at Lil Fimo Creations',
        text: `${req.body.name}, email: ${req.body.email}, phone number ${req.body.phone}, says: ${req.body.message}`
      };
      transporter.sendMail(mailOpts);
      res.status(200).send({ sent: true });
    }


  });
}