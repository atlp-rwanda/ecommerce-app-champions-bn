/* eslint-disable arrow-body-style */

import upload from "../utils/helpers/multer";

const uploadImages = (name) => {
  return async (req, res, next) => {
    try {
      upload.array(name)(req, res, (err) => {
        if (err) {
          return res.status(400).json({ status: "fail", error: err.message });
        }

        next();
      });
    } catch (error) {
      return error.message;
    }
  };
};

export default uploadImages;
