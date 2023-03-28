import { Op } from "sequelize";

import { Product, sequelize, Category,Vendor,user } from "../database/models";

class productController{
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
    }

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

      if (req.user.role.roleName !== "vendor") {
        return res
          .status(401)
          .json({ status: "fail", message: req.t("Unauthorized") });
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



  static async getAllProducts(req, res) {
    try{
     
   console.log(req.user);
   if (req.user.roleName !== "vendor") {
            return res.status(401).json({
              status: "error",
              error: "Unauthorized. You must be a seller to perform this action.",
            });
          }

   const sellerId = req.user.id;
   const { page = 1, limit = 10 } = req.query;

        const items = await Product.findAndCountAll({
        where: {
          vendorId: sellerId,
        },
        include: [
          {
            model: Category,
          },
          {
            model: Vendor,
            include: [
              {
                model: user,
                attributes: ["firstName", "lastName", "email"],
              },
            ],
          },
        ],
        limit,
        offset: (page - 1) * limit,
      });

      return res.status(200).json({
        status: "success",
        message: "Items retrieved successfully.",
        items: items.rows,
        totalPages: Math.ceil(items.count / limit),
        currentPage: page,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        error: error.message,
      });
    }


   };

  static async getAvailableProduct(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const items = await Product.findAndCountAll({
        where: {
          available: true,
        },
        include: [
          {
            model: Category,
          },
          {
            model: Vendor,
            include: [
              {
                model: user,
                attributes: ["firstName", "lastName", "email"],
              },
            ],
          },
        ],
        limit,
        offset: (page - 1) * limit,
      });

      return res.status(200).json({
        status: "success",
        message: "Items retrieved successfully.",
        items: items.rows,
        totalPages: Math.ceil(items.count / limit),
        currentPage: page,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  }
    
}

export default productController;