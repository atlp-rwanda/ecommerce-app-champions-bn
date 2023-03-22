import { Op } from "sequelize";
import { Product, sequelize,Category } from "../database/models";

class ProductController{
    static async searchProduct(req,res){
        const { searchParam } = req.query;
        try {
            const search = await Product.findAll({ where:{
                [Op.or]:[
                    {productName:{
                        [Op.like]:`%${searchParam}%`
                    }},
                    {productDescription:{
                        [Op.like]:`%${searchParam}%`
                    }},
                    {productOwner:{
                        [Op.like]:`%${searchParam}%`
                    }},
                ]
            }});
            return res.status(200).json({status:"success",data:search});
        } catch (error) {
            return res.status(500).json({status:"error",error:error.message});
        }
    };


  static async createProduct(req, res) {
    try {
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


export default ProductController;




