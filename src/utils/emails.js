/* eslint-disable import/no-extraneous-dependencies */
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import dotenv from "dotenv";
import { timeStamp } from "console";

dotenv.config();

const transporter = () => nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

class SendEmail {
  constructor(vendors, password,url) {
    this.to = vendors.email;
    this.firstName = vendors.firstName;
    this.randomAuth = password;
    this.from = `ATLP-Champions E-commerce <${process.env.EMAIL}>`;
  }

  // Send the  email using email
  async send(template,subject) {
    const html = await ejs.renderFile(
      path.join(__dirname, `./../emailTemplates/${template}.ejs`),
      {
        firstName: this.firstName,
        authNum: this.randomAuth,
       
      }
    );

    const options = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: html
    };


    await transporter().sendMail(options);
  }

  async randomPassword() {
    await this.send("randomPassword", "Random password");
    
  }
}

export default SendEmail;
