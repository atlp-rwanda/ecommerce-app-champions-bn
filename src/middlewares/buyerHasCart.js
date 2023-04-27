/* eslint-disable require-jsdoc */
/* istanbul ignore file */
import { Cart } from "../database/models/index";

export default async function buyerHasCart(req, res, next) {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ where: { BuyerId: userId } });
    if (!cart) {
      return res
        .status(404)
        .json({ status: "fail", message: "add products to cart first" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ status: "fail", error: error.message });
  }
}