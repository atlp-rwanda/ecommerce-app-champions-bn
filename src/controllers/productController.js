import { Op } from "sequelize";
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

  static async searchProduct(req,res){
    const { searchParam } = req.query;
    try {
        const search = await Product.findAll({where:{
            [Op.or]:[
                {productName:{[Op.iLike]:`%${searchParam}%`}},
                {productDescription:{[Op.iLike]:`%${searchParam}%`}},
                {productPrice:{[Op.iLike]:`%${searchParam}%`}},
                {productOwner:{[Op.iLike]:`%${searchParam}%`}},
            ]
        }});
        return res.status(200).json({status:"success",data:search});
    } catch (error) {
        return res.status(500).json({status:"error",error:error.message});
    }
}

  static async availableProducts(req,res){
    try {
      if (req.user.roleName !== "vendor") {
        return res.status(401).json({ status: "fail", message: req.t("Unauthorized") });
      }
     
      const product = await Product.findAll({ where: {vendorId: req.user.id } });
     
      if (!product) {
        return res.status(404).json({ status: "fail", message: req.t("productnotfound")});
      }
      return res.status(200).json({ status: req.t("success"),products:{product} });
  
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
}

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









}

export default productController;
