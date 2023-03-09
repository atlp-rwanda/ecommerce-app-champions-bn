import express from "express";
import cors from "cors";

import passport from "passport";
import routes from "./routes/index";

import languages from "./locales/languages";
import swaggerDocs from "./api-docs/swagger";

import Oauthroute from "./routes/Oauthroute";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(morgan('dev'));

swaggerDocs(app);
languages(app);

app.use("/", routes);

// route for signin with google
app.use(passport.initialize());

app.use("/", Oauthroute);

app.get("/", (_, res) => {
  res.status(200).json("Welcome to our Ecommerce App");
});

export default app;
