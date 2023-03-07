import express from "express";
import cors from "cors";
import routes from "./routes/index";

import languages from './locales/languages';
import swaggerDocs from './api-docs/swagger';
import connectDb from "./database/connectDb";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

swaggerDocs(app);
languages(app);

app.get("/", (_, res) => {
  res.status(200).json("Welcome to our Ecommerce App");
});
app.use("/", routes);

export default app;
