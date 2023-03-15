import { Router } from "express";
import UserController from "../controllers/userController";
import { validate } from "../middlewares/validate";
import { vendorSignup,vendorLogin} from "../validations/vendorSchema";
import isLoggedIn from "../middlewares/checklogin";


const userRoute = Router();

userRoute.post("/signup", validate(vendorSignup), UserController.vendorSignup);
userRoute.post("/login",validate(vendorLogin),UserController.signin);
// userRoute.delete("/logout",isLoggedIn,async (req, res, next) => {
//     try {
//       await UserController.logout(req, res);
//       return res.status(204).send();
//     } catch (error) {
//       return res.status(500).json({ Error: error.message, status: 500 });
//     }} );
userRoute.delete("/logout", isLoggedIn, async (req, res, next) => {
    try {
      await UserController.logout(req, res);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ Error: error.message, status: 500 });
    }
  });

export default userRoute;
