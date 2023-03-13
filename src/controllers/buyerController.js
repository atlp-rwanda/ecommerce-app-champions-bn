import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import SendEmail from "../utils/sendEmail";

dotenv.config();

const { user } = require("../database/models");


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

    console.log("salt is here:",salt);

    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("this is hashed:",hashedPassword);

    const buyer = await new user({
      firstName,
      lastName,
      email,
      password:hashedPassword
    });
console.log(buyer);
    buyer.save();

    const token = jwt.sign({ id: buyer.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
   const url=process.env.URL;

    const sendmail=new SendEmail(buyer,token,url);
    sendmail.send('sendEmailToBuyer',"Welcome");
    
    res.status(201).json({
      status: "success",
      message: "Buyer created successfully",
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