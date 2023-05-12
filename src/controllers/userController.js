/* istanbul ignore file */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import speakeasy from "speakeasy";
import { handleCookies, getCookieInfo } from "../utils/handleCookies";
import comparePassword from "../utils/verifyPassword";
import { generateAccessToken } from "../utils/helpers/generateToken";
import sendEmail from "../utils/sendEmail";

const {
  User,
  Role,
  Permission,
} = require("../database/models");

dotenv.config();
class UserController {
  static async signin(req, res) {
    try {
      const { dataValues } = await User.findOne({
        where: { email: req.body.email }
      });
      if (!dataValues)
        return res.status(401).json({ status: "fail", message: "user not exists" });
      if (dataValues.passwordStatus === false)
        return res.status(401).json({status: "fail",message: " your password has expired",expriration: dataValues.passwordStatus});
      const existingRole = await Role.findByPk(dataValues.RoleId, {
        include: { model: Permission }
      });
      const roles = existingRole.toJSON();
      const match = await bcrypt.compare(
        req.body.password,
        dataValues.password
      );
      if (!match)
        return res
          .status(401)
          .json({ status: "fail", message: "invalid password" });
      if (roles.roleName === "vendor") {
        const secret = await speakeasy.generateSecret({ length: 15 });
        const OTP = await speakeasy.totp({
          secret: secret.base32,
          encoding: "base32",
          time: Math.floor(Date.now() / 1000 / 90),
          step: 90
        });
        const salt = await bcrypt.genSalt(10);
        const hashedOTP = await bcrypt.hash(OTP, salt);
        const emailData = {
          firstName: dataValues.firstName,
          email: dataValues.email,
          OTP
        };
        sendEmail(emailData, "twoFactorAuthentication");
        const encodedOTP = Buffer.from(hashedOTP).toString("base64");
        await handleCookies(
          5,
          "loginOTP",
          encodedOTP,
          "loginVendorid",
          dataValues.id,
          res
        );
        const payload = {
          encodedOTP,
          vendorId: dataValues.id
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "5m"
        });
        return res.status(200).json({
          firstName: dataValues.firstName,
          hashedOTP,
          encodedOTP,
          user: dataValues.id,
          token
        });
      }
      const token = jwt.sign(
        { id: dataValues.id, role: roles },
        process.env.JWT_SECRET
      );
      res.cookie("token", token, {
        secure: false,
        httpOnly: true,
        sameSite: "lax",
        signed: true
      });
      const { password, ...others } = dataValues;
      return res
        .status(200)
        .json({ status: "success", data: { others, roles }, token });
    } catch (error) {
      return res.status(400).json({ status: "error", error: error.message });
    }
  }

  static async getUser(req, res) {
    try {
      const existingUser = await User.findByPk(req.params.id, {
        include: [
          {
            model: Role,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [Permission]
          }
        ]
      });
      if (!existingUser) {
        return res
          .status(404)
          .json({ status: "fail", message: req.t("user not found") });
      }
      return res
        .status(200)
        .json({ status: req.t("success"), data: existingUser });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  static async Validate(req, res) {
    try {
      const { validToken } = req.body;
      const { encodedOTP, vendorId } = jwt.verify(
        req.params.token,
        process.env.JWT_SECRET
      );
      const hashedOTP = encodedOTP;
      if (hashedOTP) {
        const decodedToken = Buffer.from(hashedOTP, "base64").toString("utf-8");
        const providedOTP = validToken;
        const isMatch = await comparePassword(providedOTP, decodedToken);
        if (isMatch) {
          const vendor = await User.findOne({
            where: { id: vendorId }
          });
          if (vendor) {
            vendor.isVerified = true;
            await vendor.save();
          }
          const existingRole = await Role.findByPk(vendor.RoleId, {
            include: { model: Permission }
          });
          const roles = existingRole.toJSON();
          // provide a new token
          const token = await generateAccessToken({
            id: vendor.id,
            firstName: vendor.firstName,
            email: vendor.email,
            RoleId: vendor.RoleId,
            role: roles
          });
          res.cookie("token", token, {
            secure: false,
            httpOnly: true,
            sameSite: "lax",
            signed: true
          });
          res.status(200).json({
            status: "success",
            token,
            message: "authentication was success",
            firstName: vendor.firstName,
            email: vendor.email,
            RoleId: vendor.RoleId,
            role: roles
          });
        } else {
          res
            .status(401)
            .json({ status: "fail", message: "Invalid token provided" });
        }
      } else {
        res.status(403).json({ status: "fail", message: "No cookie found" });
      }
    } catch (error) {
      res.status(500).json({ status: "fail", error: error.message });
    }
  }

  static async logout(req, res) {
    try {
      await res.clearCookie("token");
      return res
        .status(200)
        .json({ status: req.t("success"), message: req.t("message") });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  // get single user profile
  static async getUserProfile(req, res) {
    try {
      const user = await User.findOne({ where: { id: req.user.id } });
      if (user) {
        res
          .status(200)
          .json({ status: "success", message: req.t("Found"), data: user });
      } else {
        res.status(404).json({ status: "fail", message: req.t("notfound") });
      }
    } catch (error) {
      res.status(500).json({ status: "fail", error: error.message });
    }
  }
}
export default UserController;
