/* istanbul ignore file */
import * as dotenv from 'dotenv';
import db, { sequelize } from '../database/models/index';
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
import cron from 'node-cron';
import EventEmitter from 'events';
const emitter = new EventEmitter();
const { User } = db;
dotenv.config();

let mailList=[];
const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const sendPasswordChangePromptEmail = async (user) =>{
 
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });
    const frontendResetLink = `${process.env.FRONTEND_APP_URL}`;
    const mailOptions = {
      to: user,
      from: `ATLP-Champions E-commerce <${process.env.EMAIL}>`,
      subject: "Your App Password Reset",
      html: `
      <p>Hi,</p>
      <p>You are receiving this email because we received a password reset request for your account.</p>
      <p>Please click on the following button to reset your password:</p>
      <button style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">
        <a style="color: white; text-decoration: none;" href="${frontendResetLink}">Reset Password</a>
      </button>
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
    `
    };
    await transporter.sendMail(mailOptions);

  }
  
export const checkPassword = () =>{
    (async () => {
        cron.schedule(`${process.env.CRON_SCHEDULE}`, async () => {
          const expiredUsers = await User.findAll({
            where: sequelize.literal(`
              NOW() - "lastPasswordUpdate" > INTERVAL '${process.env.PASSWORD_EXPIRY}'
            `),
          });
        if (expiredUsers.length) {
            try {
              for (let i = 0; i < expiredUsers.length; i++) {
                // Update status of the User to NeedsToUpdatePassword
                await expiredUsers[i].update({ passwordStatus: false });
                mailList.push(expiredUsers[i].email)

              }
              sendPasswordChangePromptEmail(mailList)
              console.log("emails sent")

            } catch (error) {
              console.log(error);
            }
          } else {
            console.log('No expired password');
          }
        
        });
      })();
}
emitter.on('start', checkPassword);
emitter.emit('start');

