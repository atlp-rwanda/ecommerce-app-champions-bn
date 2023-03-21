/* eslint-disable */
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import indexRouter from "./routes/index";

import languages from './locales/languages';
import swaggerDocs from "./api-docs/swagger";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(morgan("dev"));

swaggerDocs(app);
languages(app);

app.get("/", (_, res) => {
    res.status(200).json("Welcome to our Ecommerce App");
});
app.use("/", indexRouter);

export default app;
