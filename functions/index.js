const admin = require('firebase-admin');
const functions = require('firebase-functions');
const contactMailer = require('./contactMailer');
const paypalMailer = require('./paypalMailer');

admin.initializeApp();

exports.paypalMailer = functions.https.onRequest((req, res) => {
  paypalMailer.handler(req, res);
});

exports.contactMailer = functions.https.onRequest((req, res) => {
  contactMailer.handler(req, res);
});
