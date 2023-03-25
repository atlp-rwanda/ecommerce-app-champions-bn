import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import speakeasy from "speakeasy";
import { handleCookies, getCookieInfo } from "../utils/handleCookies";
import comparePassword from "../utils/verifyPassword";
import SendEmail from "../utils/2faEmail";
import { generateAccessToken } from "../utils/helpers/generateToken";

const { user, Role, Permission } = require("../database/models");

dotenv.config();

class UserController {
  static async signin(req, res) {
    try {
      const { dataValues } = await user.findOne({
        where: { email: req.body.email }
      });
      if (!dataValues)
        return res
          .status(401)
          .json({ status: "fail", message: "user not exists" });
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
        const { url } = process.env;
        await new SendEmail(
          url,
          dataValues.firstName,
          dataValues.email,
          OTP
        ).twoFactorAuth();
        const encodedOTP = Buffer.from(hashedOTP).toString("base64");
       

        await handleCookies(
          5,
          "loginOTP",
          encodedOTP,
          "loginVendorid",
          dataValues.id,
          res
        );
        return res
          .status(200)
          .json({ firstName: dataValues.firstName, hashedOTP });
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
      const existingUser = await user.findByPk(req.params.id, {
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
          .json({ status: "error", message: req.t("user not found") });
      }
      return res
        .status(200)
        .json({ status: req.t("success"), data: existingUser });
    } catch (error) {
      return res.status(500).json({ status: "error", error: error.message });
    }
  }

  static async Validate(req, res) {
    try {
      const { validToken } = req.body;
      // checking if the cookies exists
      if (req.headers.cookie) {
        const Cookiearray = req.headers.cookie.trim().split(";");
        const cookies = await getCookieInfo(Cookiearray);
        const hashedOTP = cookies.loginOTP;
        // validate the token
        const decodedToken = Buffer.from(hashedOTP, "base64").toString("utf-8");
        const providedOTP = validToken.trim();
        const isMatch = await comparePassword(providedOTP, decodedToken);
        if (isMatch) {
          const vendor = await user.findOne({
            where: { id: cookies.loginVendorid }
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
            roleName: roles.roleName
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
            message: "authentication was success"
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
      console.log(error);
    }
  }

  static async logout(req, res) {
    try {
      await res.clearCookie("token");
      return res
        .status(200)
        .json({ status: req.t("success"), message: req.t("message")});
    } catch (error) {
      return res.status(500).json({ status: "error", error: error.message });
    }
  }
}

export default UserController;
