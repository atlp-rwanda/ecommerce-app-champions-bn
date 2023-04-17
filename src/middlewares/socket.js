import {User} from "../database/models";

const socketauth = async (socket, next) => {
  try {
    const userId =socket.handshake.query.id;
    const existingUser = await User.findOne({where:{id:userId}});
  
    if (existingUser) {
        socket.data.user =existingUser.toJSON();
        next();
    } else{
        next(new Error('Authentication error'));
    }
    
  } catch (error) {
    console.log(error.message);
  }

};

export default socketauth;
