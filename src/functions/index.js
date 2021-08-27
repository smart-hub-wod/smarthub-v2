import React from "react";
import functions from "firebase-functions";
import nodemailer from "nodemailer";

const cors = require("cors")({
  origin: true,
});

// configure the email and password in the firebase dev where the queries are sent to
// to check type firebase functions:config:get to view the config of firebase
const devEmail = functions.config().gmail.email;
const devPassword = functions.config().gmail.password;

const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: devEmail,
    pass: devPassword,
  },
});

exports.submit = functions.https.onRequest((req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "*");

  //   options request chooses the communication type
  if (req.method === "OPTIONS") {
    res.end();
  } else {
    // below is for enable the CORS support except for POST method
    cors(req, res, () => {
      if (req.method !== "POST") {
        return;
      }
    });
  }

  const mailOptions = {
    from: req.body.email,
    replyTo: req.body.email,
    to: devEmail,
    subject: `From ${req.body.name} ${req.body.title}`,
    text: req.body.feedback,
    html: `<p>${req.body.message}</p>`,
  };

  return mailTransport.sendMail(mailOptions).then(() => {
    console.log("new email sent to: ", devEmail);
    res.status(200).send({
      isEmailSend: true,
    });
    return;
  });
});
