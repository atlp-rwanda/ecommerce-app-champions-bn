/* eslint-disable */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { user, Role,Permission} = require("../database/models");

class UserController {
  static async signin (req,res){
    try {
      const {dataValues} = await user.findOne({where:{email:req.body.email}});
      if(!dataValues) return res.status(401).json({status:"fail",message:'user not exists'});
      const existingRole = await Role.findByPk(dataValues.RoleId,{include:{model:Permission}});
      const roles = existingRole.toJSON();
      console.log(roles)
      const match = await bcrypt.compare(req.body.password,dataValues.password);
      console.log(match)
      if(!match) return res.status(401).json({status:"fail",message:'invalid password'});
      const token = jwt.sign({id:dataValues.id,role:roles},process.env.JWT_SECRET);
      res.cookie("token",token,{
        secure:false,
        httpOnly:true,
        sameSite:'lax' ,signed:true       
      });
      const {password,...others} = dataValues;
<<<<<<< HEAD
      return res.status(200).json({status:"success",data:{others,roles},token});
=======
      return res.status(200).json({status:"success",data:others,token});
>>>>>>> 3040e29 (ft(logout):Logout from the app)
    } catch (error) {
      return res.status(400).json({status:"error",error:error.message});
    }
  }
  static async getUser(req,res){
    try {
      const existingUser = await user.findByPk(req.params.id,{
        include:[
          {model:Role,
            attributes: { exclude: ['createdAt','updatedAt'] },
            include:[Permission]}
        ]
      });
      if(!existingUser){
        return res.status(404).json({status:"error",message:req.t('user not found')});
      }
      return res.status(200).json({status:req.t("success"),data:existingUser});

    } catch (error) {
      return res.status(500).json({status:"error",error:error.message});
    }
  }
  
  
  

  
}

export default UserController;
