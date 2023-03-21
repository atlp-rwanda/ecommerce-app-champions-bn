import bcrypt from "bcrypt";
import { Op } from "sequelize";
import randomPassword from "../utils/randomPassword";
import SendEmail from "../utils/emails";

const { user, Role,Permission,Vendor} = require("../database/models");


class VendorController{
    static async registerVendor(req, res) {
        try {
          const { firstName, lastName, email } = req.body;
          const exists = await user.findOne({ where: { email: req.body.email } });
          req.user = exists;
          if (exists) {
            return res
              .status(409)
              .json({ status: 409, message: "User Already Exists" });
          }
          const password = randomPassword();
          const hashedPassword = await bcrypt.hash(password, 10);
          const users = await user.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
          });
          const vendors = await users.save();
          const Vendorpermissions = await Permission.findAll({where:{permissionName:{[Op.like]:'vendor%'}}});
          const role = await Role.findOne({where:{roleName:'vendor'}});
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
}

export default VendorController;