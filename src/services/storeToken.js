/* eslint-disable import/prefer-default-export */
import { LoggedInUser } from "../database/models";

import { generateAccessToken,generateRefreshToken,decodeRefreshToken } from "../utils/generateToken";
import { updateOrCreate } from "./userService";

const storeToken =  async (user=null,token=null) =>{
    if(token){
        const refereshTokenExist = await LoggedInUser.findOne({where:{refreshToken:token}});
        if(!refereshTokenExist) return null;
        user = await decodeRefreshToken(token);
        await LoggedInUser.destroy({where:{refreshToken:token}});
    }

    try {
        const userData={
            id:user.id,
            email:user.email
        };
        const accessToken = await generateAccessToken(userData);
        const refreshToken = await generateRefreshToken(userData);
        await updateOrCreate(LoggedInUser,{userId:userData.id},{userId:userData.id,refreshToken});
        return {accessToken,refreshToken};
    } catch (error) {
        return error.message;
    }
};


export default storeToken;