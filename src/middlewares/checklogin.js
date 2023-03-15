



import { LoggedInUser } from '../database/models';
import { decodeAccessToken } from '../utils/helpers/generateToken';


const isLoggedIn = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token === undefined) return res.status(401).json({ Error:"please log in", status: 401 });
  
  try {
    const user = await decodeAccessToken(token);
    if (!user) {
        return res.status(401).json({ Error:"please log in", status: 401 });;
    }
    const loggedIn = await LoggedInUser.findOne({
      where: { user_id: user.id }
    });
    if (!loggedIn) {
        return res.status(401).json({ Error:"please log in", status: 401 });;
    }
    req.user = user;
    next();
  } catch (error) {
    return error;
  }
};
export default isLoggedIn;