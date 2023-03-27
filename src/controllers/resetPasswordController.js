const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { User } = require("../database/models");

// Define the nodemailer transporter object
const transporter = nodemailer.createTransport({
  service: "hotmail",
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
  const resetLink = `${process.env.APP_URL}/reset-password/${token}`;
  const mailOptions = {
    to: user.email,
    from: `ATLP-Champions E-commerce <${process.env.EMAIL}>`,
    subject: "Your App Password Reset",
    text: `Hi ${user.firstName},\n\nYou are receiving this email because we received a password reset request for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n${resetLink}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`
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
  return res.status(200).json({ message: "Password reset email sent" });
}

async function processReset(req, res) {
  const { token } = req.params;
  const { password } = req.body;
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
        error: "Invalid token"
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
      error: "Invalid tokenfedgdsghd"
    });
  }
}

module.exports = { requestReset, processReset };
