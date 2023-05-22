/* eslint-disable */
/* istanbul ignore file */
import { verify } from "../utils/jwt";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.token;
    if (!authHeader) {
      return res
        .status(401)
        .json({ status: "fail", error: "Token is required to continue" });
    }
    const token = authHeader.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ status: "fail", error: "You are not authenticated" });
    const verified = verify(token);
    req.user = verified;
    return next();
  } catch (error) {
    res.status(401).json({ status: "fail", error: error.message });
  }
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user.role.roleName);
    if (req.user.role.roleName === "admin") {
      return next();
    } else {
      return res
        .status(401)
        .json({ status: "fail", error: "you are not authorized" });
    }
  });
};

export const verifyVendor = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role.roleName === "vendor") {
      return next();
    } else {
      return res
        .status(401)
        .json({ status: "error", error: "you are not authorized" });
    }
  });
};

export const verifyBuyer = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role.roleName === "buyer") {
      console.log(req,"=================");
      return next();
    } else {
      return res
        .status(403)
        .json({ status: "fail", error: "you are not authorized" });
    }
  });
};


export const  verifyResetToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded.email);
      }
    });
  });
}