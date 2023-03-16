
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import SendEmail from "../utils/sendEmail";

// const { user,Role,Permission,Buyer } = require("../database/models");

dotenv.config();
const { user,Role,Permission,Buyer } = require("../database/models");

class BuyerController {

<<<<<<< HEAD
=======
class BuyerController {

>>>>>>> 61506f1 (ft-register-vendor:)
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



static async verifyBuyer(req,res){


  const userId=jwt.verify(req.query.token,process.env.JWT_SECRET);
if(!userId){
  return res.status(403).json({status:"error",
message:"Invalid token"});
}

  const verifiedUser=await user.findOne({_id:userId});

  if(!verifiedUser){
    return res.status(404).json({status:"error",message:"user not found"});
  }

  verifiedUser.isVerified=true;

  verifiedUser.save();

  

  return res.status(200).json({status:"success",message:"Token verified successfully"});
}




};


export default BuyerController;
