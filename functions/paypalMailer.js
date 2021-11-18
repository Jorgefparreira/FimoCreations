const cors = require('cors')({ origin: true });
const nodemailer = require('nodemailer');
const functions = require('firebase-functions');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().mail.id,
    pass: functions.config().mail.appkey
  }
});
exports.handler = function (req, res) {
  cors(req, res, () => {

    const mailOpts = {
      from: `annonimous@email.com`,
      to: functions.config().mail.id,
      subject: 'New paypal order from Lil Fimo Creations',
      text: `name:${req.body.name}`
    };
    transporter.sendMail(mailOpts);
    res.status(200).send({ sent: true });
  });
}