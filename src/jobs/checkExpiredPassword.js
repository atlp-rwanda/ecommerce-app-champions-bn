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
    const resetLink = `${process.env.APP_URL}/reset-password/${token}`;
    const mailOptions = {
      to: user,
      from: `ATLP-Champions E-commerce <${process.env.EMAIL}>`,
      subject: "Your App Password Reset",
      text: `Hello,\n\nYou are receiving this email because  your password was expired.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n${resetLink}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`
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
                // Update status of the User to "NeedsToUpdatePassword"
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


