/* eslint-disable*/
import { Op, where } from "sequelize";
import models from "../database/models";
import generateCouponCode from "../utils/helpers/couponGenerate";

const { CouponCodeDiscount, Product, Vendor, Buyer, Cart } = models;

class CouponCodeController {
  static async createCouponCode(req, res) {
    const { productId, discount, expirationDate, maxUsage } = req.body;
    if (discount <= 0) {
      return res
        .status(409)
        .json({
          status: "fail",
          message: "dicount must be greater than zero."
        });
    }
    const couponCode = generateCouponCode();
    const vendor = await Vendor.findOne({ where: { UserId: req.user.id } });
    const newCoupon = {
      couponCode,
      discount,
      expirationDate,
      maxUsage,
      product: productId
    };
    try {
      const coupon = await CouponCodeDiscount.create(newCoupon);
      await coupon.setVendor(vendor);
      return res.status(201).json({ status: "success", data: coupon });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  static async getVendorCoupons(req, res) {
    try {
      const vendor = await Vendor.findOne({ where: { UserId: req.user.id } });
      const vendorCoupons = await CouponCodeDiscount.findAll({
        where: { VendorId: vendor.dataValues.id }
      });
      return res.status(200).json({ status: "succcess", data: vendorCoupons });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  static async checkExpiredCoupons(req, res) {
    try {
      const expiredCoupons = await CouponCodeDiscount.findAll({
        where: {
          expirationDate: { [Op.lt]: new Date() },
          discountStatus: true
        }
      });

      await Promise.all(
        expiredCoupons.map((coupon) => {
          return coupon.update({ discountStatus: false });
        })
      );
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  static async applyCoupons(req, res) {
    try {
      const couponCode = req.body.couponCode;
      const buyer = await Buyer.findOne({ where: { UserId: req.user.id } });
      const coupon = await CouponCodeDiscount.findOne({
        where: { couponCode: couponCode }
      });
      if (!coupon) {
        return res
          .status(404)
          .json({ status: "fail", message: "No coupon code" });
      }
      if (coupon.dataValues.expirationDate < new Date()) {
        return res
          .status(400)
          .json({ status: "fail", message: "coupon code expired " });
      }
      if (coupon.dataValues.usageCount >= coupon.dataValues.maxUsage) {
        return res
          .status(400)
          .json({ status: "fail", message: "Maximum usage reached" });
      }
      let eligibleProducts = [];
      const product = await Product.findByPk(coupon.dataValues.product);
      if (!product) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      eligibleProducts.push(product.dataValues);
      const cart = await Cart.findOne({ where: { BuyerId: req.user.id } });
      const updatedCartItems = cart.dataValues.products.map((item) => {
        const product = eligibleProducts.find(
          (product) => product.productId === item.productId
        );
        
        if (product) {
            const discountAmount =
            item.productPrice * (coupon.dataValues.discount / 100);
          const discountedPrice = item.productPrice - discountAmount;
          return {
            ...item,
            productPrice: discountedPrice,
            discount: discountAmount,
            couponCode: coupon.dataValues.couponCode
          };
        }
        return item;
      });
      const totalDiscount = updatedCartItems.reduce(
        (total, item) => total + item.discount * item.quantity,
        0
      );
      const updatedCartTotal = cart.dataValues.total - totalDiscount;
      await Cart.update(
        { products: updatedCartItems, total: updatedCartTotal },
        { where: { BuyerId: req.user.id } }
      );
      await CouponCodeDiscount.increment(
        { usageCount: 1 },
        { where: { couponCode: couponCode } }
      );
      return res
        .status(200)
        .json({ status: "success", data: updatedCartTotal });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  static async updateCoupon(req, res) {
    try {
      const { discount, expirationDate, maxUsage } = req.body;
      const coupon = await CouponCodeDiscount.findByPk(req.params.id);
      if (!coupon) {
        return res
          .status(404)
          .json({ status: "fail", message: "coupon not found." });
      }
      const updatedCoupon = await CouponCodeDiscount.update(
        {
          discount: discount,
          expirationDate: expirationDate,
          maxUsage: maxUsage
        },
        { where: { id: req.params.id } }
      );
      return res.status(200).json({ status: "success", data: updatedCoupon });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  static async deleteCoupon(req, res) {
    try {
      const coupon = await CouponCodeDiscount.findByPk(req.params.id);
      if (!coupon) {
        return res
          .status(404)
          .json({ status: "fail", message: "coupon not found" });
      }
      await CouponCodeDiscount.destroy({ where: { id: req.params.id } });
      return res
        .status(200)
        .json({ status: "success", message: "coupon deleted" });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }
}

export default CouponCodeController;
