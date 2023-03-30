import { Product } from "../database/models";

const checkOwner = async (req, res, next) => {
  const product = await Product.findOne({ where: { productId: req.params.id } });
  if (req.user.id === product.VendorId) {
    req.product = product;
    next();
  } else {
    res.status(401).json({ status: "fail" ,message: "You don't own this product" });
  }
};
export default checkOwner;
