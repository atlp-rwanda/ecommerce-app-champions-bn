import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import SendEmail from "../utils/sendEmail";

dotenv.config();
const { user,Role,Permission,Buyer } = require("../database/models");

class BuyerController {

static async createBuyer (req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existingBuyer = await user.findOne({
      where: { email: { [Op.eq]: email } },
    });



    if (existingBuyer) {

      return res.status(409).json({
        status: "error",
        message: req.t("existEmail"),
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const buyer = await user.create({
      firstName,
      lastName,
      email,
      password:hashedPassword
    });
    const token = jwt.sign({ id: buyer.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
   if(!token){
    return;
   }
    const role = await Role.findOne({where:{roleName:"buyer"}});
    const buyerpermissions = await Permission.findAll({where:{permissionName:{[Op.like]:'buyer%'}}});
    role.addPermissions(buyerpermissions);
    await buyer.setRole(role);
    const buyerProfile = await Buyer.create({});
    buyer.setBuyer(buyerProfile);
   const url=process.env.URL;
    const sendmail=new SendEmail(buyer,token,url);
    sendmail.send('sendEmailToBuyer',"Welcome");
  
    res.status(201).json({
      status: "success",
      message: req.t("buyerSuccess"),
      data:buyer,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

};


export default BuyerController;