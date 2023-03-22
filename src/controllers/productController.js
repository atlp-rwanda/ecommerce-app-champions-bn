import { Product, Category } from "../database/models";

class productController {
  static async createProduct(req, res) {
    if (req.user.roleName === "vendor") {
      try {
        const {
          productName,
          productPrice,
          quantity,
          productDescription,
          productOwner,
          CategoryId,
          bonus,
          expiredDate
        } = req.body;
        const productImage = req.files.map((img) => img.path);
        const product = await Product.create({
          vendorId: req.user.id,
          productName,
          productPrice,
          quantity,
          productDescription,
          productOwner,
          expiredDate,
          CategoryId,
          bonus,
          productImage
        });
        await product.save();
        return res.status(200).json({
          status: "success",
          message: "product created",
          product: { product }
        });
      } catch (error) {
        return res.json({ error: error.message });
      }
    } else {
      return res
        .status(401)
        .json({ status: "Oops!", message: "only suppliers allowed" });
    }
  }
  

  static async categoryController(req, res) {
    const { name } = req.body;
    try {
      if (req.user.roleName !== "vendor") {
        return res
          .status(401)
          .json({ status: "fail", message: "Unauthorized access" });
      }
      const category = await Category.create({
        name
      });

      await category.save();

      return res.status(200).json({ message: "category created" });
    } catch (error) {
      return error.message;
    }
  }
}

export default productController;
