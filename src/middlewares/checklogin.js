
import { decodeAccessToken } from '../utils/helpers/generateToken';

const isLoggedIn = async (req, res, next) => {
  const {token} = req.signedCookies; 
  if (!token) {
    return  res.status(401).json({  status:req.t("fail") , Error:req.t("Error")});
  }
  try {
    const user = await decodeAccessToken(token);
    if (!user) {
      return res.status(401).json({status:req.t("fail"), Error:req.t("Error")});
    }
   next();
  } catch(error) {
    return error;
  }
};

export default isLoggedIn;


