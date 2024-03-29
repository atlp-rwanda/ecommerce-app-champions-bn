import express from "express";
import cookieParser from "cookie-parser";
import passport from "../controllers/Oauthcontroller";

const Oauthroute = express.Router();

const cookieSecret = "myCookieSecret";
Oauthroute.use(cookieParser(cookieSecret));


try {
  Oauthroute.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
      session: false
    })
  );

  Oauthroute.get(
    "/auth/google/redirect",
    passport.authenticate("google", { session: false }),
    (req, res) => {
      const {token} = req.user;
      res.cookie("token", token);
      res.redirect(`${process.env.REDIRECT_URL}/loginSuccess?token=${token}`);
    }
  );
  
} catch (error) {
  console.error(`Error setting up Oauth routes: ${error}`);
}

export default Oauthroute;
