import { where } from "sequelize";
import models from "../database/models";
import generateCouponCode from "../utils/helpers/couponGenerate";

const { CouponCodeDiscount, Product } = models;

class CouponCodeController {
  static async createCouponCode(req, res) {
    const { productId, discount, expirationTime,VendorId } = req.body;
    const newDiscount = discount/100;
    const couponCode = generateCouponCode();
    if (discount && expirationTime) {
      const existingProduct = await Product.findByPk(productId);
      const newCoupon = {
        couponCode,
        discount,
        originalPrice:existingProduct.dataValues.productPrice,
        finalPrice:existingProduct.dataValues.productPrice * newDiscount,
        expirationTime,
        discountStatus:true,
        ProductId:productId,
        VendorId
      };
      try {
        await existingProduct.save();
        await Product.update({discount,newPrice:existingProduct.dataValues.productPrice * newDiscount},{where:{productId}});
        const coupon = await CouponCodeDiscount.create(newCoupon);
        return res.status(201).json({status:"success",data:coupon});
      } catch (error) {
        return res.status(500).json({ status: "fail", error: error.message });
      }
    }
  }
}

export default CouponCodeController;
