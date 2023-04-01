import dotenv from "dotenv";
import app from "./app";
import { CroneJobs } from "./jobs/index";

import connectDb from "./database/connectDb";

dotenv.config();

const port = process.env.PORT ? process.env.PORT : 3000;

app.listen(port, async () => {
  await connectDb();
  console.log(`Server is running on http://localhost:${port}`);
});
