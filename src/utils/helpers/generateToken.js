import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const generateAccessToken = async (paramsObject) => {
  const token = jwt.sign(paramsObject, process.env.JWT_SECRET, { expiresIn: '30h' });
  return token;
};

// eslint-disable-next-line no-return-await
const decodeAccessToken = async (accessToken) => await jwt.verify(accessToken, process.env.JWT_SECRET,{ expiresIn: '2d' });
const generateResetToken = async (paramsObject) => jwt.sign(paramsObject, process.env.JWT_SECRET, { expiresIn: '15m' });

export {
  generateAccessToken,
  decodeAccessToken,
  generateResetToken
};