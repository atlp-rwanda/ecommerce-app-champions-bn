const { User } = require("../database/models");

const Users = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const user = await User.create({
      firstName,
      lastName,
      email,
    });
    await user.save();
    return res
      .status(200)
      .json({ status: "success", message: "user created successfully" });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "failed to add a user information",
      error: error.message
    });
  }
};

export default Users;
