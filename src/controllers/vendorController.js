// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from "bcrypt";
import SendEmail from "../utils/emails";
import randomPassword from "../utils/randomPassword";
import { Users } from "../database/models";

const vendorRegister = async (req, res) => {
  try {
    const { firstname, lastname, email, profilePic } = req.body;
    const password = randomPassword();
    const hashedPassword = await bcrypt.hash(password, 10);
    const registerVendor = await Users.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      roleId: 2,
      profilePic
    });
    const vendors = await registerVendor.save();
    await new SendEmail(vendors, password).randomPassword();
    res.status(200).json({
      status: "success",
      message: "vendor created successfully",
      data: { vendors }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default vendorRegister;
