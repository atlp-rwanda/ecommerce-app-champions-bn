import bcrypt from "bcrypt";
import { Op } from "sequelize";
import randomPassword from "../utils/randomPassword";
import SendEmail from "../utils/emails";

const { user, Role, Permission, Vendor,ReportedActivity } = require("../database/models");

class VendorController {
  static async registerVendor(req, res) {
    try {
      const { firstName, lastName, email } = req.body;
      const exists = await user.findOne({ where: { email: req.body.email } });
      req.user = exists;
      if (exists) {
        return res
          .status(409)
          .json({ status: 409, message: "vendor Already Exists" });
      }
      const password = randomPassword();
      const hashedPassword = await bcrypt.hash(password, 10);
      const users = await user.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
      });
      const vendors = await users.save();
      const Vendorpermissions = await Permission.findAll({
        where: { permissionName: { [Op.like]: "vendor%" } }
      });
      const role = await Role.findOne({ where: { roleName: "vendor" } });
      role.addPermissions(Vendorpermissions);
      await vendors.setRole(role);
      await new SendEmail(vendors, password).randomPassword();
      const vendorProfile = await Vendor.create({});
      vendors.setVendor(vendorProfile);
      return res.status(201).json({
        status: "success",
        message: "vendor created successfully",
        vendorinfo: { vendors }
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: "failed to add a user information",
        error: error.message
      });
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const { userId } = req.params;
      const requestBody = req.body;
      const profile = await Vendor.findOne({ where: { id: userId } });
      if (profile) {
        const updatedProfile = {
          ...profile.toJSON(),
          ...requestBody
        };
        const updateVendorProfile = await profile.update(updatedProfile);
        if (updateVendorProfile) {
          const profileMessage = req.t("profileMessage");
          return res
            .status(200)
            .json({ status: 200, data: { Message: req.t(profileMessage) } });
        }
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
      next(error);
    }
  }

  static async getProfile(req, res, next) {
    try {
      const { userId } = req.params;
      const { dataValues } = await user.findOne({ where: { id: userId } });
      const profile = await Vendor.findOne({ where: { id: userId } });
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

  static async getAllVendors(req,res){
    try {
      const vendors = await Vendor.findAll({include:[
        { model:ReportedActivity }
      ]});
      return res.status(200).json({status:"success",data:vendors});
    } catch (error) {
      return res.status(500).json({status:"success",error:error.message});
    }
  }

  static async getSingleVendor(req,res){
    try {
      const vendor = await Vendor.findByPk(req.params.id,{include:[
        { model:ReportedActivity }
      ]});
      return res.status(200).json({status:"success",data:vendor});
    } catch (error) {
      return res.status(500).json({status:"success",error:error.message});
    }
  }

  static async disableVendorAccount(req,res){
    try {
      const existingVendor = await Vendor.findByPk(req.params.id);
      const reportedactivities = await ReportedActivity.findAll({where:{VendorId:req.params.id}});
        await user.update({active:false},{where:{id:existingVendor.dataValues.userId}});
        return res.status(200).json({status:"success",message:'user desactivated'});
    } catch (error) {
      return res.status(500).json({ status: "error", error: error.message });
    }
  }
}

export default VendorController;
