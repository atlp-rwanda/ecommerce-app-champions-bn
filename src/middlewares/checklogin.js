

import { decodeAccessToken } from '../utils/helpers/generateToken';

const isLoggedIn = async (req, res, next) => { 
  const authHeader = req.headers.token;
    if (!authHeader) {
      return  res.status(401).json({  status:req.t("fail") , Error:req.t("Error")});
    }
    const token = authHeader.split(" ")[1];
  try {
    const user = await decodeAccessToken(token);
    if (!user) {
      return res.status(401).json({status:req.t("fail"), Error:req.t("Error")});
    }
    req.user=user;
   next();
  } catch(error) {
    return error;
  }
 
};

export default isLoggedIn;


