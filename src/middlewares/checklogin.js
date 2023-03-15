
import { decodeAccessToken } from '../utils/helpers/generateToken';

const isLoggedIn = async (req, res, next) => {
  const {token} = req.signedCookies; 
  if (!token) {
    return  res.status(401).json({  status:"fail" , Error:"please log in"});
  }
  try {
    const user = await decodeAccessToken(token);
    if (!user) {
      return res.status(401).json({status:"fail", Error: "please log in" });
    }
   next();
  } catch(error) {
    return error;
  }
};

export default isLoggedIn;


