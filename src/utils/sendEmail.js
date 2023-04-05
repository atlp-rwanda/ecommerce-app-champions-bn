/*eslint-disable*/
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { randomPasswordEmail } from "./templates/randomPassword";
import { sendEmailToBuyer } from "./templates/sendEmailToBuyer";
import { twoFactorEmail } from "./templates/2FA";
import { disableVendorAccount } from "./templates/disableVendor";
import { resetPasswordEmail } from "./templates/resetPassword";
import { expiredProductsTemplate } from "./templates/expiredProducts";

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
      subject = `Welcome to Our Marketplace - Vendor Account Created ${info.email}`;
      emailto = info.email;
      composition = randomPasswordEmail(info.firstName, info.password);
      break;
    case "createBuyerAccount":
      subject = `Confirm Your Account ${info.firstName}`;
      emailto = info.email;
      composition = sendEmailToBuyer(info.firstName, info.url,info.token);
      break;
    case "twoFactorAuthentication":
      subject = `Welcome to Our Marketplace - Verify your account ${info.email}`;
      emailto = info.email;
      composition = twoFactorEmail(info.firstName,info.authNum,info.url)
      break;
    case "resetPassword":
      subject = `Reset your password ${info.firstName}`;
      emailto = info.email;
      composition = resetPasswordEmail(info.firstName,info.token)
      break;
    case "disableVendorAccount":
      subject = "disable account for illegal activities";
      emailto = info.email;
      composition = disableVendorAccount(info.report);
      break;
    case "expiredProducts":
      subject = "expired products";
      emailto = info.email;
      composition = expiredProductsTemplate(info.firstName);
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
      if(error){
        throw new Error(error);
      }
      return sendMail;
    });
  } catch (error) {
    throw new Error(error);
  }
};

export default sendEmail;