import dotenv from "dotenv";
import app from "./app";
import routes from "./routes/index";

import swaggerDocs from "./api-docs/swagger";

import connectDb from "./database/connectDb";

dotenv.config();

const port = process.env.PORT ? process.env.PORT : 3000;

app.listen(port, async () => {
  await connectDb();
  console.log(`Server is running on http://localhost:${port}`);
});

swaggerDocs(app);

app.get("/", (_, res) => {
  res.status(200).json("Welcome to our Ecommerce App");
});
app.use("/", routes);


export default app;

