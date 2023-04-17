import http from "http";
import path from "path";
import { Server } from "socket.io";
import dotenv from "dotenv";
import app from "./app";
import { CroneJobs } from "./jobs/index";

import connectDb from "./database/connectDb";

import socketauth from "./middlewares/socket";

import chartController from "./controllers/liveChartController";

dotenv.config();
const port = process.env.PORT ? process.env.PORT : 3000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.get("/chat", (req, res) => {
  res.render("chat");
});

server.listen(port, async () => {
  await connectDb();
  // socket middleware
  io.use(socketauth);
  io.on("connection", chartController.postChat);
  console.log(`Server is running on http://localhost:${port}`);
});
