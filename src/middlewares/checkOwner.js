import { Product } from "../database/models";

const checkOwner = async (req, res, next) => {
  const product = await Product.findOne({ where: { id: req.params.id } });
  if (req.user.id === product.vendorId) {
    req.product = product;
    next();
  } else {
    res.status(401).json({ status: "failed" ,message: "You don't own this product" });
  }
};
export default checkOwner;
