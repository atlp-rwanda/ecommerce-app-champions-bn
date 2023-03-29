import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import SendEmail from "../utils/sendEmail";
import * as profiles from "../services/profile.service";

dotenv.config();
const { User, Role, Permission, Buyer } = require("../database/models");

class BuyerController {
  static async createBuyer(req, res) {
    try {
      const { firstName, lastName, email, password } = req.body;
      const existingBuyer = await User.findOne({
        where: { email: { [Op.eq]: email } }
      });

      if (existingBuyer) {
        return res.status(409).json({
          status: "error",
          message: req.t("existEmail")
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const buyer = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
      });
      const token = jwt.sign({ id: buyer.id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
      });

      if (!token) {
        return;
      }
      const role = await Role.findOne({ where: { roleName: "buyer" } });
      const buyerpermissions = await Permission.findAll({
        where: { permissionName: { [Op.like]: "buyer%" } }
      });
      role.addPermissions(buyerpermissions);
      await buyer.setRole(role);
      const buyerProfile = await Buyer.create({});
      buyer.setBuyer(buyerProfile);
      const url = process.env.URL;
      const sendmail = new SendEmail(buyer, token, url);
      sendmail.send("sendEmailToBuyer", "Welcome");

      res.status(201).json({
        status: "success",
        message: req.t("buyerSuccess"),
        data: buyer
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }


  static async verifyBuyer(req,res){


    const userId=jwt.verify(req.query.token,process.env.JWT_SECRET);
  
  
  if(!userId){
    return res.status(403).json({status:"error",
  message:"Invalid token"});
  }
  
  const verifiedUser=await user.findOne({
    where: {id:userId.id}});
  
  
    if(!verifiedUser){
      return res.status(404).json({status:"error",message:"user not found"});
    }
  
    verifiedUser.isVerified=true;
  
    verifiedUser.save();
  
    return res.status(200).json({status:"success",message:"Token verified successfully"});
  }
  

  static async updateProfile(req, res, next) {
    try {
      const { userId } = req.params;
      const requestBody = req.body;
      const profile = await profiles.findUserProfile(userId);
      if (profile) {
        const updatedProfile = await profiles.updateProfile(
          userId,
          requestBody
        );
        if (updatedProfile) {
          const profileMessage = req.t("profileMessage");
          return res
            .status(200)
            .json({ status: 200, data: { Message: req.t(profileMessage) } });
        }
      } else {
        const message = req.t("notfound");
        return res
          .status(401)
          .json({ status: 404, data: { Message: req.t(message) } });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
      next(error);
    }
  }

  static async getProfile(req, res, next) {
    try {
      const { userId } = req.params;
      const { dataValues } = await User.findOne({ where: { id: userId } });
      const profile = await profiles.findUserProfile(userId);
      const { ...others } = dataValues;
      if (profile) {
        res.json({ message: req.t("Found"), data: { others, profile } });
      } else {
        const Message = req.t("notfound");
        res.json({ message: Message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
      next(error);
    }
  }
}

export default BuyerController;