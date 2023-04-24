/* istanbul ignore file */
import multer from "multer";
import storage from "./cloudinary";

const fileFilter = (req, file, cb) => {
    if (file.mimetype==="image/jpeg" || file.mimetype==="image/png" || file.mimetype==="image/webp"){
        cb(null,true);
    }else{
        cb({message:"file format not supported"},false);
    }
  };
const upload=multer({storage,fileFilter});


export default upload;
