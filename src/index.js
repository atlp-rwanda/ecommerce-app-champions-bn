import http from "http";
import path from "path";
import { Server } from "socket.io";
import dotenv from "dotenv";
import app from "./app";
import { CroneJobs } from "./jobs/index";

import connectDb from "./database/connectDb";
import formatMessage from "./utils/helpers/chatMessages";
import { userJoin, userLeave,
  getUsers, } from "./utils/helpers/chatUsers";
import { Chat } from "./database/models";

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

app.get('/api/checkPasswordExpiry', async (req, res) => {
  try {
    await CroneJobs();
    return res.status(200).json({ message: 'Password expiry check and email sending initiated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong while initiating password expiry check and email sending process' });
  }
});

server.listen(port, async () => {
  await connectDb();

  io.on("connection",(socket)=>{

    socket.on("joinChat",async (username) => {
      const user =await userJoin(socket.id, username);
      // meassage when user join chat
      socket.emit("message", formatMessage("champion", "welcome to Our public chat"));
      // broadcast when a user connects
      socket.broadcast.emit("message", formatMessage("champion", `${user.username} has joined chat`));
  
        // Emit the list of online users to the client
        const onlineUsers = await getUsers();
        socket.emit('connectedUser', onlineUsers);
        socket.broadcast.emit('connectedUser', onlineUsers);
    });

     if(socket.handshake.query.id){
      console.log("socket.data.usersocket.data.user",socket.handshake.query);
      socket.on('chatMessage', async (meassageRecived) => {
        await Chat.create({ message:meassageRecived, userId:socket.handshake.query.id }).then(() => {
             socket.emit('message', formatMessage(socket.handshake.query.firstName,meassageRecived));
             socket.broadcast.emit('message', formatMessage(socket.handshake.query.firstName,meassageRecived));
         });
       });
      } 
       //   Runs when clients disconnects
       socket.on("disconnect",async () => {
         const user =await userLeave(socket.id);
          if (user) {
           socket.broadcast.emit(
             "message",
             formatMessage("champion", `${user.username} has left the chat`)
           );

           // Send usersInfo  to frontEnd
          // Emit the list of online users to the client
          const onlineUsers = await getUsers();
          socket.emit('connectedUser', onlineUsers);
          socket.broadcast.emit('connectedUser', onlineUsers);
         }
       });
            // notifications events
     socket.on('notification', (data) => {
      io.emit('notification', data);
      });

  });
  console.log(`Server is running on http://localhost:${port}`);
});






