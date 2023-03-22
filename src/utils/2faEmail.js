/* eslint-disable import/no-extraneous-dependencies */
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const transporter = () =>
  nodemailer.createTransport({
    service: `${process.env.SERVICE}`,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });
class SendEmail {
  constructor(url, firstName, email, OTP) {
    this.to = email;
    this.firstName = firstName;
    this.randomAuth = OTP;
    this.url = url;
    this.from = `ATLP-Champions E-commerce <${process.env.EMAIL}>`;
  }

  // Send the  email using email
  async send(template, subject) {
    const html = await ejs.renderFile(
      path.join(__dirname, `./../emailTemplates/${template}.ejs`),
      {
        firstName: this.firstName,
        authNum: this.randomAuth,
        url: this.url,
        token: this.token
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
  
  async twoFactorAuth() {
    await this.send("2FA", "Two factor authentication code");
  }
}
export default SendEmail;
