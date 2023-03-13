import jwt from 'jsonwebtoken';
import envConfig from '../../config';

const {JWT_SECRET ,REFRESH_TOKEN} = envConfig[process.env.NODE_ENV];

const generateAccessToken = async (paramsObject) => {
  const token = jwt.sign(paramsObject, JWT_SECRET, { expiresIn: '1h' });
  return token;
};
const generateRefreshToken = async (paramsObject) => {
  try {
    const token = jwt.sign(paramsObject, REFRESH_TOKEN, { expiresIn: '1d' });
    return token;
  } catch (error) {
    return null;
  }
};
const decodeAccessToken = async (accessToken) => {
  try {
    const decodedToken = await jwt.verify(accessToken, JWT_SECRET);
    return decodedToken;
  } catch (error) {
    return null;
  }
};
const decodeRefreshToken = async (refreshToken) => {
  try {
    const decodedToken = await jwt.verify(refreshToken, REFRESH_TOKEN);
    return decodedToken;
  } catch (error) {
    return null;
  }
};
const generateResetToken = async (paramsObject) => {
  const token = jwt.sign(paramsObject, JWT_SECRET, { expiresIn: '15m' });
  return token;
};

export {
  generateAccessToken,
  generateRefreshToken,
  decodeAccessToken,
  decodeRefreshToken,
  generateResetToken
};