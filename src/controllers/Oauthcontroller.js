import passport from "passport";

import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../database/models";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      callbackURL: `http://localhost:5000/auth/google/redirect`,
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      clientID: process.env.client_id,
      clientSecret: process.env.client_secret
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const userEmail = profile.emails && profile.emails[0].value;

        const userInfo = {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: userEmail,
          isVerified: profile.emails[0].verified,
          googleId: profile.id,
          profilepic: profile.photos[0].value
        };

        const [Nuser, created] = await User.findOrCreate({
          where: { email: userEmail },
          defaults: userInfo
        });

        if (created) return cb(null, Nuser);
        return cb(null, Nuser);
      } catch (error) {
        cb(error);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
