import express from "express";
import cors from "cors";
// eslint-disable-next-line import/no-extraneous-dependencies
import morgan from "morgan";
import routes from "./routes/index";


import languages from './locales/languages';
import swaggerDocs from './api-docs/swagger';

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(morgan('dev'));

swaggerDocs(app);
languages(app);

app.get("/", (_, res) => {
  res.status(200).json("Welcome to our Ecommerce App");
});
app.use("/", routes);

export default app;
