import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User, Vendor } from "../database/models";
import emitter from "../events/notifications";

dotenv.config();

const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

const { Cart, Order, Product, Sale } = require("../database/models");

class PaymentController {
  static async paymentCheckout(req, res) {
    const appUrl = `${req.protocol}://${req.headers.host}`;
    const token = jwt.sign(req.user, process.env.JWT_SECRET);
    try {
      const cart = await Cart.findOne({ where: { BuyerId: req.user.id } });
      const orderItems = [];
      cart.products.forEach((element) => {
        const amount = element.productPrice * 100;
        const item = {
          price_data: {
            currency: "usd",
            product_data: {
              name: element.productName,
              images: [element.productImage]
            },
            unit_amount: amount
          },
          quantity: element.quantity
        };
        orderItems.push(item);
      });
      const session = await stripe.checkout.sessions.create({
        line_items: orderItems,
        mode: "payment",
        success_url: `${appUrl}/api/payment/paymentSuccess?token=${token}&&paymentId={CHECKOUT_SESSION_ID}`
      });
      res.status(200).json({ status: "success", token, paymentId: session.id, url: session.url });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  static async paymentSuccess(req, res) {
    try {
      const { token, paymentId } = req.query;
      const user = jwt.verify(token, process.env.JWT_SECRET);
      const cart = await Cart.findOne({ where: { BuyerId: user.id } });
      const session = await stripe.checkout.sessions.retrieve(paymentId);
      if (session.payment_status === "paid") {
        const order = await Order.create({ BuyerId: user.id, orderTotal: cart.total, paymentStatus: session.payment_status });
        await order.save();

        cart.products.map(async (element) => {
          const product = await Product.findOne({
            where: { productId: element.productId }
          });
          const sales = await Sale.create({ OrderId: order.id, ProductId: element.productId, VendorId: product.dataValues.VendorId, Quantity: element.quantity });

          await sales.save();

          const owner = await Vendor.findOne({ where: { id: sales.dataValues.VendorId }, include: [{ model: User }] });
          const { productName } = product.dataValues;
          const ownerDetails = owner.User.dataValues;
          emitter.emit("productSold", productName, ownerDetails);
          await Product.update( { quantity: product.dataValues.quantity - element.quantity }, { where: { productId: element.productId } } );
        });
        await Cart.destroy({ where: { BuyerId: user.id } });
      }

      return res.json({ status: "success", payment_status: session.payment_status });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }
}

export default PaymentController;
