import { user } from "../database/models";

const vendorVerify = async (req, res, next) => {
  const exists = await user.findOne({ where: { email: req.body.email } });
  req.user = exists;
  if (exists) {
    return res
      .status(409)
      .json({ status: 409, message: "User Already Exists" });
  }

  next();
};

export default vendorVerify;
