import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import SendEmail from "../utils/sendEmail";

const { user,Role } = require("../database/models");

dotenv.config();
class Buyers {
static async createBuyer (req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;
    
    const existingBuyer = await user.findOne({
      where: { email: { [Op.eq]: email } },
    });
    if (existingBuyer) {
      return res.status(400).json({
        status: "error",
        message: "Email already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const buyer = await new user({
      firstName,
      lastName,
      email,
      password:hashedPassword
    });
    buyer.save();
    const role = await Role.findOne({where:{roleName:'buyer'}});
    await buyer.addRole(role);
    // const token = jwt.sign({ id: buyer.id }, process.env.JWT_SECRET, {
    //   expiresIn: "1d",
    // });
   const url=process.env.URL;
    // const sendmail=new SendEmail(buyer,token,url);
    // sendmail.send('sendEmailToBuyer',"Welcome");
    
    res.status(201).json({
      status: "success",
      data:buyer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};


};


export default Buyers;