
import { User, Chat } from "../database/models";

let chats={};

const getChats = async (req, res) => {
  try {
     chats = await Chat.findAll({ include: [{ model: User }] });
    res.status(200).json({ status: "success", data: { chats } });
  } catch (error) {
    res.status(500).json({ status: "fail", message:error.message });
  }
};


export default { getChats };