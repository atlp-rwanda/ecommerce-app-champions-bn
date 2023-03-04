import express from "express";
import cors from "cors";
import routes from "./routes/index";

import swaggerDocs from "./api-docs/swagger";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

swaggerDocs(app);

app.get("/", (_, res) => {
  res.status(200).json("Welcome to our Ecommerce App");
});
app.use("/", routes);


export default app;

