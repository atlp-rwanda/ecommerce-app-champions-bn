import { Sale, Product, Vendor } from "../database/models";

class SalesController {
  static async getAllSales(req, res) {
    try {
      const Vendors = await Vendor.findOne({where: { UserId: req.user.id }});
      const getSales = await Sale.findAll({ where: { VendorId: Vendors.dataValues.id }, include: [ { model: Product } ] });
      if (getSales.length === 0) {
        return res.status(404).json({ status: "fail", message: "No product sold" });
      }
      return res.status(200).json({ data: { getSales } });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }
}

export default SalesController;
