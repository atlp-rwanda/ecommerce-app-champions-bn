const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { user } = require("../database/models");

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
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const resetLink = `${process.env.APP_URL}/reset-password/${token}`;
    const mailOptions = {
      to: user.email,
      from: 'Your App <noreply@your-app.com>',
      subject: 'Your App Password Reset',
      text: `Hi ${user.firstName},\n\nYou are receiving this email because we received a password reset request for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n${resetLink}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
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
  await user.update({
    password: hashedPassword,
    resetToken: null,
    resetTokenExpires: null,
  }, {
    where: { email },
  });
}

async function requestReset(req, res) {
  const { email } = req.body;
  const foundUser = await user.findOne({ where: { email } });
  if (!foundUser) {
    return res.status(404).json({ error: 'Email not found' });
  }
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  foundUser.resetToken = token;
  foundUser.resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour
  await foundUser.save();
  await transporter.sendResetEmail(foundUser);
  return res.json({ message: 'Password reset email sent' });
}

async function processReset(req, res) {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const email = await verifyResetToken(token);
    const user = await user.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (user.resetToken !== token || user.resetTokenExpires < new Date()) {
      return res.status(400).json({ error: 'Invalid token' });
    }
    await resetPassword(email, password);
    return res.json({ message: 'Password reset successful' });
  } catch (err) {
    return res.status(400).json({ error: 'Invalid token' });
  }
}

module.exports = { requestReset, processReset };
