import { Socket } from "socket.io";
import { User, Chat } from "../database/models";
import formatMessage from "../utils/helpers/chatMessages";
import {
  userJoin,
  userLeave,
  getUsers,
} from "../utils/helpers/chatUsers";

let chats={};

const getChats = async (req, res) => {
  try {
     chats = await Chat.findAll({ include: [{ model: User }] });
    res.status(200).json({ status: "success", data: { chats } });
  } catch (error) {
    res.status(500).json({ status: "fail", message:error.message });
  }
};

const postChat = async (socket) => {
  
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


  socket.on('chatMessage', async (meassageRecived) => {
   await Chat.create({ message:meassageRecived, userId:socket.data.user.id }).then(() => {
        socket.emit('message', formatMessage(socket.data.user.firstName,meassageRecived));
        socket.broadcast.emit('message', formatMessage(socket.data.user.firstName,meassageRecived));
    });
  });



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


};

export default { getChats, postChat };