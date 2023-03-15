import jwt from 'jsonwebtoken';
import envConfig from '../../config';

const {JWT_SECRET} = envConfig[process.env.NODE_ENV];

const generateAccessToken = async (paramsObject) => {
  const token = jwt.sign(paramsObject, JWT_SECRET, { expiresIn: '1h' });
  return token;
};

// eslint-disable-next-line no-return-await
const decodeAccessToken = async (accessToken) => await jwt.verify(accessToken, JWT_SECRET,{ expiresIn: '2d' });
const generateResetToken = async (paramsObject) => jwt.sign(paramsObject, JWT_SECRET, { expiresIn: '15m' });

export {
  generateAccessToken,
  decodeAccessToken,
  generateResetToken
};