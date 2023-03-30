

import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
import cloudinaryStorage from "multer-storage-cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env. CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage= new cloudinaryStorage({
    cloudinary,params:{folder:"ATLP_Champs"}
});

export default storage ;