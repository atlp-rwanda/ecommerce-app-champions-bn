import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import swaggerDocs from "./api-docs/swagger";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
dotenv.config();

const port = process.env.PORT ? process.env.PORT : 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

swaggerDocs(app);

app.get("/", (_, res) => {
  res.status(200).json("Welcome to our Ecommerce App");
});
