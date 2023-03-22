/*eslint-disable*/
import nodemailer from "nodemailer";
import dotenv from "dotenv";

import { randomPasswordEmail } from "./templates/randomPassword";

dotenv.config();

const sendEmail = (info, action) => {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let subject, composition, emailto;

  switch (action) {
    case "createVendorAccount":
      subject = "Vendor account creation";
      emailto = info.email;
      composition = randomPasswordEmail(info.firstName, info.password);
      break;
    case "createBuyerAccount":
      subject = "Buyer account creation";
      emailto = info.email;
      composition = randomPasswordEmail(info.firstName, info.password);
      break;
    default:
      subject = "";
      break;
  }

  const mailOptions = {
    from: `ATLP-Champions E-commerce ${process.env.EMAIL}`,
    to: emailto,
    subject,
    html: composition
  };

  try {
    const sendMail = transporter.sendMail(mailOptions, (error, result) => {
      console.log(error);
      console.log(result);
      return sendMail;
    });
  } catch (error) {
    console.log("error");
    return error;
  }
};

export default sendEmail;