/* istanbul ignore file */
import { Op } from "sequelize";
import sendEmail from "../utils/sendEmail";

const { Role, Permission, User, Vendor, Buyer } = require("../database/models");

class RoleController {
  static async getAllRoles(req, res) {
    try {
      const roles = await Role.findAll({ include: [Permission] });
      return res.status(200).json({ status: "success", data: roles });
    } catch (error) {
      return res.status(500).json({ status: "error", error: error.message });
    }
  }

  static async assignRole(req, res) {
    const { prevRole, newRole } = req.body;
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res.status(404).json({ status: "error", error: "user not found" });
    }

    if (prevRole === "vendor" && newRole === "buyer") {
      const upcommingRole = await Role.findOne({
        where: { roleName: newRole }
      });

      await Vendor.destroy({ where: { UserId: req.params.id } });
      const buyerProfile = await Buyer.create({});
      user.setBuyer(buyerProfile);
      user.setRole(upcommingRole);
      const emailData = {
        email: user.dataValues.email,
        role: newRole,
        firstName: user.dataValues.firstName
      };
      sendEmail(emailData,"assignRole");
      return res.status(200).json({ status: "success", data: user });
    }
    if (prevRole === "buyer" && newRole === "vendor") {
      const upcommingRole = await Role.findOne({
        where: { roleName: newRole }
      });
      await Buyer.destroy({ where: { UserId: req.params.id } });
      const vendorProfile = await Vendor.create({});
      user.setVendor(vendorProfile);
      user.setRole(upcommingRole);
      const emailData = {
        email: user.dataValues.email,
        role: newRole,
        firstName: user.dataValues.firstName
      };
      sendEmail(emailData,"assignRole");
      return res.status(200).json({ status: "success", data: user });
    }
  }

  static async createRole(req, res) {
    try {
      const { roleName } = req.body;
      const existingRole = await Role.findOne({ where: { roleName } });
      if (existingRole) {
        return res
          .status(400)
          .json({ status: req.t("fail"), message: req.t("roles") });
      }
      const role = await Role.create({ roleName });
      const userpermissions = await Permission.findAll({
        where: { permissionName: { [Op.like]: `${roleName}%` } }
      });
      if (!userpermissions) {
        return res
          .status(400)
          .json({ status: "fail", error: "the role have no permissions" });
      }
      role.addPermissions(userpermissions);
      return res.status(201).json({ status: req.t("success"), data: role });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        error: error.message
      });
    }
  }

  static async deleteRole(req, res) {
    try {
      const existingRole = await Role.findOne({ where: { id: req.params.id } });
      if (!existingRole)
        return res
          .status(404)
          .json({ status: "fail", message: "roles not found" });
      await Role.destroy({ where: { id: req.params.id } });
      return res.status(200).json({ status: "success", message: "deleted" });
    } catch (error) {
      return res.status(500).json({ status: "error", error: error.message });
    }
  }

  // static async removePermissionOnRole(req,res){
  //   try {

  //   } catch (error) {
  //     return res.status(500).json()
  //   }
  // }
}

export default RoleController;
