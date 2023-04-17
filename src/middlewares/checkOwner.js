import { Product, Vendor } from "../database/models";

const checkOwner = async (req, res, next) => {
  const Vendors = await Vendor.findOne({where: { UserId: req.user.id }});
  const product = await Product.findOne({ where: { productId: req.params.id } });
  if (Vendors.dataValues.id === product.dataValues.VendorId) {
    req.product = product;
    next();
  } else {
    res.status(401).json({ status: "fail" ,message: "You don't own this product" });
  }
};
export default checkOwner;
