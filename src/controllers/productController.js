import { Op } from "sequelize";

import {Product,sequelize,Category,Vendor,User,Wishlist} from "../database/models";

class ProductController {
  static async searchProduct(req, res) {
    const { searchParam } = req.query;
    try {
      const search = await Product.findAll({
        where: {
          [Op.or]: [
            {
              productName: {
                [Op.like]: `%${searchParam}%`
              }
            },
            {
              productDescription: {
                [Op.like]: `%${searchParam}%`
              }
            },
            {
              productOwner: {
                [Op.like]: `%${searchParam}%`
              }
            }
          ]
        }
      });
      return res.status(200).json({ status: "success", data: search });
    } catch (error) {
      return res.status(500).json({ status: "error", error: error.message });
    }
  }

  static async createProduct(req, res) {
    try {
      const {productName,productPrice,quantity,productDescription,productOwner,bonus,expiredDate,category} = req.body;
      const productImage = req.files.map((img) => img.path);
      const postProduct = await Product.create({
        productName,
        productPrice,
        quantity,category,productDescription,productOwner,expiredDate,bonus,productImage});
      const existCategory = await Category.findOne({where: { name: req.body.category }});
      const existVendor = await Vendor.findOne({where: { UserId: req.user.id }});
      await postProduct.setVendor(existVendor);
      await postProduct.setCategory(existCategory);
      return res.status(200).json({ status: "success", postProduct });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  static async categoryController(req, res) {
    const { name } = req.body;
    try {
      const postCategory = await Category.create({ name });
      return res.status(201).json({ status: "category created", category: postCategory });
    } catch (error) {
      return res.status(500).json({ status: "failed to add category", error: error.message });
    }
  }

  static async getProductById(req, res) {
    try {
      const productId = req.params.id;

      if (Number.isNaN(productId)) {
        return res.status(400).json({status: "fail",message: `Invalid id (${req.params.id})`});
      }

      const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).json({status: "fail",message: "Product not found."});
      }

      if (!product.available) {
        return res.status(404).json({status: "fail",message: "Product not available for sale."});
      }

      if ( req.user && req.user.role.roleName === "vendor" && req.user.role.id !== product.vendorId) {
        return res.status(403).json({status: "fail",message: "You are not allowed to perform this operation"});
      }
      res.status(200).json({status: "success",item: product});
    } catch (err) {
      res.status(400).json({status: "fail",message: err.message});
    }
  }

  static async getAllProducts(req, res) {
    try {
      if (req.user.roleName !== "vendor") {
        return res.status(401).json({
          status: "error",
          error: "Unauthorized. You must be a seller to perform this action."
        });
      }

      const sellerId = req.user.id;
      const { page = 1, limit = 10 } = req.query;

      const items = await Product.findAndCountAll({
        where: {
          vendorId: sellerId
        },
        include: [
          {
            model: Category
          },
          {
            model: Vendor,
            include: [
              {
                model: User,
                attributes: ["firstName", "lastName", "email"]
              }
            ]
          }
        ],
        limit,
        offset: (page - 1) * limit
      });

      return res.status(200).json({
        status: "success",
        message: "Items retrieved successfully.",
        items: items.rows,
        totalPages: Math.ceil(items.count / limit),
        currentPage: page
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        error: error.message
      });
    }
  }

  static async getAvailableProduct(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const items = await Product.findAndCountAll({
        where: {
          available: true
        },
        include: [
          {
            model: Category
          },
          {
            model: Vendor,
            include: [
              {
                model: User,
                attributes: ["firstName", "lastName", "email"]
              }
            ]
          }
        ],
        limit,
        offset: (page - 1) * limit
      });
      return res.status(200).json({
        status: "success",
        items: items.rows,
        totalPages: Math.ceil(items.count / limit),
        currentPage: page
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        error: error.message
      });
    }
  }

  static async addToWishlist(req, res) {
    try {
      const buyerId = req.user.id;
      const {productId} = req.params;
      const product = await Product.findOne({
        where: { productId: productId }
      });
      if (!product) {
        return res.status(404).json({ status: "fail", message: "Product not found" });
      }
      let wishlists = await Wishlist.findOne({ where: { userId: buyerId } });
      if (!wishlists) {
        // create a new wishlist if it doesn't exist
        const newWishlist = await Wishlist.create({ userId: buyerId });
        // await newWishlist.save();
        wishlists = newWishlist;
      }
      if (wishlists.products.includes(parseInt(productId))) {
        return res.status(400).json({ status: "fail", message: "Product already in wishlist" });
      }

      const newProductIds = [...wishlists.products, productId];
      wishlists.products = newProductIds;
      await wishlists.save();
      return res
        .status(200)
        .json({ status: "fail", message: "Product added to wishlist", product });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message:
          error.name === "SequelizeValidationError"
            ? error.message
            : "Internal server error"
      });
    }
  }

  static async retrieveProductItems(req, res) {
    try {
      const userId = req.user.id;
      const wishlistItems = await Wishlist.findOne({
        where: { userId: userId }
      });
      const products = [];
      for (let item of wishlistItems.products) {
        let product = await Product.findOne({ where: { productId: item } });
        if (product) {
          products.push(product);
        }
      }
      res.status(200).json({ wishlist: products });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message:
          error.name === "SequelizeValidationError"
            ? error.message
            : "Internal server error"
      });
    }
  }
}

export default ProductController;
