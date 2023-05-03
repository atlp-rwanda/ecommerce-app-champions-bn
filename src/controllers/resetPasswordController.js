const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { User } = require("../database/models");

// Define the nodemailer transporter object
const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send the password reset email

async function sendResetEmail(user) {
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });
  const resetLink = `${process.env.APP_URL}/resetpassword/${token}`;
 
  
  const frontendResetLink = `${process.env.FRONTEND_APP_URL}`;
  const mailOptions = {
    to: user.email,
    from: `ATLP-Champions E-commerce <${process.env.EMAIL}>`,
    subject: "Your App Password Reset",
    html: `
      <p>Hi ${user.firstName},</p>
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




function verifyResetToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded.email);
      }
    });
  });
}
async function resetPassword(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const foundUser = await User.findOne({ where: { email } });
  if (!foundUser) {
    return res.status(400).json({
      status: "fail",
      error: "Invalid reset token"
    });
  }
  if (foundUser.resetTokenExpiresAt < new Date()) {
    return res.status(400).json({
      status: "fail",
      error: "reset  token has expired"
    });
  }
  await foundUser.update({
    password: hashedPassword,
    resetToken: null,
    resetTokenExpiresAt: null
  });
}

async function requestReset(req, res) {
  const { email } = req.body;
  const foundUser = await User.findOne({ where: { email } });
  if (!foundUser) {
    return res.status(404).json({
      status: "fail",
      error: "Email not found"
    });
  }
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });
  foundUser.resetToken = token;
  foundUser.resetTokenExpiresAt = new Date(Date.now() + 3600000); // 1 hour

  await foundUser.save();
  await sendResetEmail(foundUser);
  return res.status(200).json({ 
    status:"success",
    message: "Password reset email sent , please check your email to reset your password",
    token:token
 });
}

async function processReset(req, res) {
  
  const { token } = req.params;
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({
      status: "fail",
      error: "Passwords do not match"
    });
  }
  try {
    const email = await verifyResetToken(token);
    const foundUser = await User.findOne({ where: { email } });
    if (!foundUser) {
      return res.status(404).json({
        status: "fail",
        error: req.t("error")
      });
    }
    if (
      foundUser.resetToken !== token ||
      foundUser.resetTokenExpiresAt < new Date()
    ) {
      console.log(foundUser.resetTokenExpiresAt);
      return res.status(400).json({
        status: "fail",
        error: "Incorrect or expired password reset token. Please request a new password reset email."
      });
    }
    await resetPassword(email, password);
    return res.status(200).json({
      status: "success",
      message: "Password reset successful"
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: "fail",
      error: "Oops something went wrong!!! please request a reset link again"
    });
  }
}
module.exports = { requestReset, processReset };