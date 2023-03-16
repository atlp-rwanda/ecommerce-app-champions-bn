/* eslint-disable import/no-extraneous-dependencies */
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const transporter = () => nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

class SendEmail {
  constructor(buyer,token,url) {
    this.to = buyer.email;
    this.firstName = buyer.firstName;
    this.token=token;
    this.url=url;
    this.from = `ATLP-Champions E-commerce <${process.env.EMAIL}>`;
  }

  // Send the  email using email
  async send(template,subject) {
    const html = await ejs.renderFile(
      path.join(__dirname, `./../emailTemplates/${template}.ejs`),
      {
        firstName: this.firstName,
        token:this.token,
        url:this.url
       
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

}

export default SendEmail;