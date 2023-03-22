
/* eslint-disable no-underscore-dangle */

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import connectDb from "../database/connectDb";
import { user } from "../database/models";


import { generateAccessToken } from "../utils/helpers/generateToken";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      callbackURL: `http://localhost:5000/auth/google/redirect`,
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
    
        await connectDb();
        const userEmail = profile.emails && profile.emails[0].value;
        const userInfo = {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: userEmail,
          isVerified:profile._json.email_verified,
          googleId:profile.id,
          profilepic:profile._json.picture
        };

        const [User, created] = await user.findOrCreate({
          where: { googleId: profile.id },
          defaults: userInfo
        });
        const token = await generateAccessToken({id: User.id, roleId: User.roleId});
        User.token = token;
        if (created) return cb(null,User);
        return cb(null,User);
      } catch (error) {
        cb(error);
      }
    }
  )
);

passport.serializeUser((User, done) => done(null, User.id));
passport.deserializeUser(async (id, done) => {
  try {
    const User = await user.findByPk(id);
    done(null, User);
  } catch (error) {
    done(error);
  }
});


export default passport;

