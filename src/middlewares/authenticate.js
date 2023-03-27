/* eslint-disable */
import { verify } from "../utils/jwt";
export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.token;
    if (!authHeader) {
      return res
        .status(401)
        .json({ status: "error", error: "Token is required to continue" });
    }
      const token = authHeader.split(" ")[1];
      if (!token)
        return res
          .status(401)
          .json({ status: "error", error: "You are not authenticated" });
      const verified = verify(token);
      req.user = verified;
      return next();
  } catch (error) {
    res.status(401).json({ status: "error", error: error.message });
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
        .json({ status: "error", error: "you are not authorized" });
    }
  });
};

export const verifyVendor = (req, res, next) => {

    verifyToken(req, res, () => {
      if (req.user.roleName === "vendor") {
        return next();
      } else {
        return res
          .status(401)
          .json({ status: "error", error: "you are not authorized" });
      }
    });
  };
