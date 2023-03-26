import { Op } from "sequelize";
import { Product, Category } from "../database/models";

class productController {
  static async createProduct(req, res) {
    try {

      if (req.user.role.roleName !== "vendor") {
        return res
          .status(401)
          .json({ status: "fail", message: req.t("Unauthorized") });
      };

     const {
        productName,
        productPrice,
        quantity,
        productDescription,
        productOwner,
        CategoryId,
        expiredDate
      } = req.body;
      const productImage = req.files.map((img) => img.path);
      const product = await Product.create({
        vendorId: req.user.role.id,
        productName,
        productPrice,
        quantity,
        productDescription,
        productOwner,
        expiredDate,
        CategoryId,
        productImage
      });

      await product.save();
      return res
        .status(200)
        .json({
          status: "success",
          message: "product created",
          product: { product }
        });
      } catch (error) {
        return res.json({ error: error.message });
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

      return res.status(200).json({ message: "category created", category:name });
    } catch (error) {
      return error.message;
    }
  }

  static async deleteProduct(req,res){
    try {
      if (req.user.role.roleNam !== "vendor") {
        console.log(req.user.role.roleName);
        return res.status(401).json({ status: "fail", message: req.t("Unauthorized") });
      }
      const product = await Product.findOne({ where: { productId: req.params.id, vendorId: req.user.role.id } });
     
      if (!product) {
        return res.status(404).json({ status: "fail", message: req.t("productnotfound")});
      }
      await product.destroy();
  
      return res.status(204).json({ status: req.t("success"), message: req.t("productdeleted") });
  
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ status: "error", message: "Internal server error" });
    }
  
  };

  static async disableProduct(req, res) {
  const { searchParam } = req.query;
  try {
    if (req.user.roleName !== "vendor") {
      return res.status(401).json({ status: "fail", message: req.t("Unauthorized") });
    }
      const productsToUpdate = await Product.findAll({
          where: {
              [Op.and]: [
                  { productId: { [Op.eq]: searchParam } },
                  { vendorId: req.user.id },
                  { [Op.or]: [
                      { quantity: 0 },
                      { expired:true }
                  ]}
              ]
          }
      });

      const productIdsToUpdate = productsToUpdate.map(product => product.productId);

      await Product.update(
          { available: true },
          { where: { productId: productIdsToUpdate } }
      );

      return res.status(200).json({ status: "success",message:req.t("productupdated") });
  } catch (error) {
      return res.status(500).json({ status: "error", error: error.message });
  }
 };

 static async enableProduct(req, res) {
  const { searchParam } = req.query;
  try {

    if (req.user.roleName !== "vendor") {
      return res.status(401).json({ status: "fail", message: req.t("Unauthorized") });
    }

      const productsToUpdate = await Product.findAll({
          where: {
              [Op.and]: [
                  { productId: { [Op.eq]: searchParam } },
                  { vendorId: req.user.id },
                  { [Op.or]: [
                      { quantity: { [Op.ne]: 0 } },
                      { expired: false }
                  ]}
              ]
          }
      });

      const productIdsToUpdate = productsToUpdate.map(product => product.productId);

      await Product.update(
          { available: true },
          { where: { productId: productIdsToUpdate } }
      );

      return res.status(200).json({ status: "success", message:req.t("productupdated") });
  } catch (error) {
      return res.status(500).json({ status: "error", error: error.message });
  }
}

  static async getProductById(req, res) {
    try {
      const productId = req.params.id;
      
      if (Number.isNaN(productId)) {
        return res.status(400).json({
          status: 'fail',
          message: `Invalid id (${req.params.id})`,
        });
      }
  
      const product = await Product.findByPk(productId);
  
      if (!product) {
        return res.status(404).json({
          status: 'fail',
          message: 'Product not found.',
        });
      }
  
      if (!product.available) {
        return res.status(404).json({
          status: 'fail',
          message: 'Product not available for sale.',
        });
      }
  
      if (req.user && req.user.role.roleName === 'vendor' && req.user.role.id !== product.vendorId) {
        return res.status(403).json({
          status: 'fail',
          message: 'You are not allowed to perform this operation',
        });
      }
      res.status(200).json({
        status: 'success',
        item: product,
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err.message,
      });
    }
  }
    
}

export default productController;
