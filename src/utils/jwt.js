/* eslint-disable */
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const sign = payload => jwt.sign(payload,process.env.JWT_SECRET);
export const verify = payload => jwt.verify(payload,process.env.JWT_SECRET)