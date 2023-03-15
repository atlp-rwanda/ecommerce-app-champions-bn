import bcrypt from "bcrypt";
import randomPassword from "../utils/randomPassword";
import SendEmail from "../utils/emails";

import { generateAccessToken } from "../utils/helpers/generateToken";

const { v4: uuidv4 } = require('uuid');
const { user,LoggedInUser} = require("../database/models");


class UserController{
  static async vendorSignup(req,res){
    try {
      const { firstName, lastName, email } = req.body;
      const exists = await user.findOne({ where: { email: req.body.email } });
      if (exists) {
        return res
          .status(409)
          .json({ status: 409, message: "User Already Exists" });
      }
      
      const password = randomPassword();
      const hashedPassword = await bcrypt.hash(password, 10);
      const createUser = await user.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        roleId: 2
      });
      
      await new SendEmail(createUser, password).randomPassword();
      return res
        .status(200)
        .json({
          status: "success",
          message: "vendor created successfully",
          vendorinfo: { createUser }
        });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: "failed to add a user information",
        error: error.message
      });
    }
  }

  static async signin (req,res){
    try {
      const {dataValues} = await user.findOne({where:{email:req.body.email}});
      if(!dataValues) return res.status(401).json({status:"fail",message:'user not exists'});

      const match = await bcrypt.compare(req.body.password,dataValues.password);
      if(!match) return res.status(401).json({status:"fail",message:'invalid password'});
      const token = await generateAccessToken({id:dataValues.id,roleId:dataValues.roleId});
      res.cookie("token",token,{
        secure:false,
        httpOnly:true,
        sameSite:'lax' ,signed:true       
      });
      const {password,...others} = dataValues;
        
    await LoggedInUser.create({
      refreshToken: uuidv4(), 
      user_id: dataValues.id   });
      return res.status(200).json({status:"success",data:others,token});
    } catch (error) {
      return res.status(400).json({status:"error",error:error.message});
    }
  }

  // static async logout(req, res) {
  //   const userId = req.user.id;
  //   try {
  //     await LoggedInUser.destroy({ where: { user_id: userId } }); // delete the current refresh token from db
  //     return res.status(204).send();
  //   } catch (error) {
  //     return res.status(400).json({status: "error", error: error.message});
  //   }
    
  //   // try {
  //   //   const {userId} =req.user.id;
  //   //   await LoggedInUser.destroy({where: {user_id: userId}});
  //   //   return res.status(200).json({status: "success", message: "User logged out successfully"});
  //   // } catch (error) {
  //   //   return res.status(400).json({status: "error", error: error.message});
  //   // }
  // }

  static async logout(req, res) {
    const userId = req.user.id;
    try {
      await LoggedInUser.destroy({ where: { user_id: userId } });
    } catch (error) {
      throw new Error('Failed to logout user');
    }
  }
}

export default UserController;
