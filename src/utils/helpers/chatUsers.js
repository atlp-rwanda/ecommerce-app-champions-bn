

import {ChatUser} from "../../database/models";

const userJoin = async (socketId, username) => {
  const existingUser = await ChatUser.findOne({ where: { username } });

  if (existingUser) {
    existingUser.socketId = socketId;
    await existingUser.save();
    return existingUser.toJSON();
  } 
    const onlineUser = await ChatUser.create({ socketId, username });
    return onlineUser.toJSON();
  
};


const userLeave = async (socketId) => {
  const onlineUser = await ChatUser.findOne({ where: { socketId } });
  if (onlineUser) {
    await onlineUser.destroy();
    return onlineUser.toJSON();
  }
  return null;
};


const getUsers = async () => {
  const onlineUsers = await ChatUser.findAll();
  return onlineUsers.map((user) => user.toJSON());
};

export { userJoin, userLeave, getUsers };
