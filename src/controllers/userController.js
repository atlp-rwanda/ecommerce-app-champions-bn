import bcrypt from "bcrypt";
import randomPassword from "../utils/randomPassword";
import SendEmail from "../utils/emails";

const { user } = require("../database/models");

const Users = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const password = randomPassword();
    const hashedPassword = await bcrypt.hash(password, 10);
    const users = await user.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      roleId: 2
    });
    const vendors = await users.save();
    await new SendEmail(vendors, password).randomPassword();
    return res
      .status(200)
      .json({ status: "success", message: "vendor created successfully", vendorinfo: {vendors} });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "failed to add a user information",
      error: error.message
    });
  }
};

export default Users;
