const admin = require('firebase-admin');
const functions = require('firebase-functions');

const sendEmail = require('./contactMailer');
// const paypalMailer = require('./paypalMailer');

admin.initializeApp();

exports.sendEmail = functions.https.onRequest((req, res) => {
  sendEmail.handler(req, res);
});