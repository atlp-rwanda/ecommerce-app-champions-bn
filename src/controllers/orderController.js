import { Order } from "../database/models";

class OrdersController {
  static async getAllOrders(req, res) {
    try {
      const Buyers = req.user.id;
      const getOrders = await Order.findAll({ where: { BuyerId: Buyers } });
      if (getOrders.length === 0) {
        return res.status(404).json({ status: "fail", message: "No product bought" });
      }
      return res.status(200).json({ status: "success", data: { getOrders } });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }
}

export default OrdersController;
