import express from "express";
import passport from "../controllers/Oauthcontroller";

const Oauthroute = express.Router();

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
    passport.authenticate("google", {
      session: false,
      failureRedirect: `https://localhost:5000/login`
    }),
    (req, res) => {
      res.redirect("http://localhost:5000/");
    }
  );
} catch (error) {
  console.error(`Error setting up Oauth routes: ${error}`);
}

export default Oauthroute;
