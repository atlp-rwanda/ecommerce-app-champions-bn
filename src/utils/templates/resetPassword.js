/*eslint-disable*/ 
import dotenv from "dotenv";
dotenv.config();

export const resetPasswordEmail = (firstName,token) =>{
  const resetLink = `${process.env.APP_URL}/reset-password/${token}`;

  return  `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Password Reset Request</title>
    </head>
    <body>
      <h1>Password Reset Request</h1>
      <p>Hello,</p>
      Hi ${firstName},\n\nYou are receiving 
      this email because we received a password reset request 
      for your account.\n\nPlease click on the following link, or paste 
      this into your browser to complete the process:<a href="${resetLink}">Reset Password</a>If you did not 
      request this, please ignore this email and your password will remain unchanged.\n
    </body>
  </html>
  `;
};