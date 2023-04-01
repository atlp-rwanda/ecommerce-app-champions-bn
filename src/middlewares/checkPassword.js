
import  jwt  from 'jsonwebtoken';
import db from '../database/models';
const {User} = db

import { findUserProfile } from '../services/profile.service';
export const checkPassword = async (req, res, next) => {
    try {
      const token = req.headers.token.split(' ')[1];
  
      const decodedData = jwt.verify(token, `${process.env.JWT_SECRET}`);
      console.log("12321234255454230000000000000000000000000000", decodedData)
  
      const currentUser = await User.findOne({where:{id :decodedData.id}}) ;
      if (currentUser.passwordStatus === false) {
        return res.status(419).json({
          status: 419,
          success: false,
          message: 'Update your Password',
        });
      } else {
        next();
      }
    } catch (error) {
        res.status(500).json({
          status: 500,
          success: false,
          message: `Error when authorizing user ${error.message}`,
        });
    };
}