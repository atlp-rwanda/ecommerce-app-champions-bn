

import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
import cloudinaryStorage from "multer-storage-cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env. api_key,
  api_secret: process.env.api_secret,
});

const storage= new cloudinaryStorage({
    cloudinary,params:{folder:"ATLP_Champs"}
});

export default storage ;