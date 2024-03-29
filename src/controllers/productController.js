/* eslint-disable*/
/* istanbul ignore file */
import { Op } from "sequelize";

import models from "../database/models";
import sendEmail from "../utils/sendEmail";
const { Product, Category, Vendor, User, Wishlist, Buyer } = models;

// eslint-disable-next-line import/no-cycle
import emitter from "../events/notifications";
import { emitProductAdded, emitProductDeleted } from "./notificationController";

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
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  static async createProduct(req, res) {
    try {
      const {
        productName,
        productPrice,
        quantity,
        productDescription,
        productOwner,
        bonus,
        expiredDate,
        category
      } = req.body;
      const productImage = req.files.map((img) => img.path);
      const postProduct = await Product.create({
        productName,
        productPrice,
        quantity,
        category,
        productDescription,
        productOwner,
        expiredDate,
        bonus,
        productImage
      });
      const existCategory = await Category.findOne({
        where: { name: req.body.category }
      });
      const existVendor = await Vendor.findOne({
        where: { UserId: req.user.id }
      });
      await postProduct.setVendor(existVendor);
      await postProduct.setCategory(existCategory);

      const logedVendor=await User.findOne({where: {id:req.user.id}});
      emitter.emit("newProductAdded",postProduct.productName,logedVendor);
      return res.status(200).json({ status: "success", postProduct });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  static async updateProduct(req, res) {
    try {
      const {
        productName,
        productPrice,
        quantity,
        productDescription,
        productOwner,
        bonus,
        expiredDate
      } = req.body;
      const productImage = req.files.map((img) => img.path);
      const productUpdate = await Product.update(
        {
          productName,
          productPrice,
          quantity,
          productDescription,
          productOwner,
          expiredDate,
          bonus,
          productImage
        },
        { where: { productId: req.params.id } }
      );
      const logedVendor = await User.findOne({ where: { id: req.user.id } });
      emitter.emit("productUpdated", req.params.id, logedVendor);

      return res.status(200).json({ status: "success", productUpdate });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  static async categoryController(req, res) {
    const { name } = req.body;
    try {
      const postCategory = await Category.create({ name });
      return res
        .status(201)
        .json({ status: "success", category: postCategory });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const existingVendor = await Vendor.findOne({
        where: { UserId: req.user.id }
      });
      const vendor = existingVendor.toJSON();
      const product = await Product.findOne({
        where: { productId: req.params.id, VendorId: vendor.id }
      });
      if (!product) {
        return res
          .status(404)
          .json({ status: "fail", message: req.t("productnotfound") });
      }
      await product.destroy();
      const logedVendor=await User.findOne({where: {id:req.user.id}});
       emitter.emit("productDeleted",product.productName,logedVendor);
      return res.status(204).json({ status: req.t("success"),data:null, message: req.t("productdeleted") });
  
    } catch (error) {
      return res
        .status(500)
        .json({ status: "fail", message: "Internal server error" });
    }
  }

  static async getProductById(req, res) {
    try {
      const productId = req.params.id;
      if (Number.isNaN(productId)) {
        return res
          .status(400)
          .json({ status: "fail", message: `Invalid id (${req.params.id})` });
      }
      const product = await Product.findByPk(productId);
      if (!product) {
        return res
          .status(404)
          .json({ status: "fail", message: "Product not found." });
      }
      if (!product.available) {
        return res
          .status(404)
          .json({ status: "fail", message: "Product not available for sale." });
      }
      res.status(200).json({ status: "success", item: product });
    } catch (err) {
      res.status(400).json({ status: "fail", message: err.message });
    }
  }

  static async getAllProducts(req, res) {
    try {
      if (req.user.role.roleName !== "vendor") {
        return res.status(401).json({
          status: "error",
          error: "Unauthorized. You must be a seller to perform this action."
        });
      }

      const existingVender = await Vendor.findOne({
        where: { UserId: req.user.id }
      });

      const sellerId = existingVender.dataValues.id;
      const { page = 1, limit = 10 } = req.query;

      const items = await Product.findAndCountAll({
        where: {
          VendorId: sellerId
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
      return res.status(500).json({ status: "fail", error: error.messag });
    }
  }

  static async getAvailableProduct(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const items = await Product.findAndCountAll({
        where: {
          available: true,
          expired: false
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

  static async getRecommendedProducts(req, res) {
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
      const firstProduct = search[0];
      const category = await Category.findOne({
        where: { id: firstProduct.CategoryId }
      });
      const recommendedProducts = await Product.findAll({
        where: {
          [Op.and]: [{ CategoryId: category.id }]
        },
        limit: 20
      });
      return res
        .status(200)
        .json({
          status: "success",
          message: "products retrieved successfully",
          data: search,
          recommendedProducts
        });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  static async addToWishlist(req, res) {
    try {
      const buyerId = req.user.id;
      const { productId } = req.params;
      const product = await Product.findOne({ where: { productId } });
      if (!product) {
        return res
          .status(404)
          .json({ status: "fail", message: "Product not found" });
      }
      let wishlists = await Wishlist.findOne({ where: { userId: buyerId } });
      if (!wishlists) {
        const newWishlist = await Wishlist.create({ userId: buyerId });
        wishlists = newWishlist;
      }
      if (wishlists.products.includes(parseInt(productId))) {
        return res
          .status(400)
          .json({ status: "fail", message: "Product already in wishlist" });
      }

      const newProductIds = [...wishlists.products, productId];
      wishlists.products = newProductIds;
      await wishlists.save();
      const logedBuyer=await User.findOne({where: {id:req.user.id}});
      emitter.emit("product added to your wishlist", product.productName,logedBuyer);
      return res
        .status(200)
        .json({
          status: "success",
          message: "Product added to wishlist",
          product
        });
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
      for (const item of wishlistItems.products) {
        const product = await Product.findOne({ where: { productId: item } });
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

  static async deleteItemFromWishlist(req,res){
    try {
      const myWishlists = await Wishlist.findOne({where:{userId:req.user.id}});
      if(!myWishlists){
        return res.status(404).json({status:"error",message:"wishlist Item not found"});
      }
      const newWishedProducts = myWishlists.dataValues.products.filter(item  => item !== parseInt(req.params.id));
      const updatedWishList = await Wishlist.update({products:newWishedProducts},{where:{userId:req.user.id}});
      return res.status(200).json({status:"success",data:updatedWishList});
    
    } catch (error) {
      return res.status(500).json({status:"error",error:error.message});
    }
  }

  static async checkExpiredProducts(req, res) {
    try {
      const expiredProducts = await Product.findAll({
        where: {
          expiredDate: { [Op.lt]: new Date() },
          expired: false
        }
      });
      let vendors = [];
      const vendorsWithExpiredProducts = Array.from(
        new Set(expiredProducts.map((product) => product.dataValues.VendorId))
      );
      vendorsWithExpiredProducts.forEach(async (vendor) => {
        const existingVendor = await Vendor.findAll({
          where: { id: vendor },
          include: User
        });
        existingVendor.map((vendor) => vendors.push(vendor.toJSON()));
        vendors.map((vendor) => {
          const emailData = {
            email: vendor.User.email,
            firstName: vendor.User.firstName
          };
          sendEmail(emailData, "expiredProducts");
        });
      });
      await Promise.all(
        expiredProducts.map((product) => {
          return product.update({ expired: true });
        })
      );
      return res.status(200).json({ status: "success", data: expiredProducts });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }

  static async availableProductsInCollection(req, res) {
    try {
      const existingVendor = await Vendor.findOne({
        where: { UserId: req.user.id }
      });
      const vendor = existingVendor.toJSON();
      const products = await Product.findAll({
        where: { VendorId: vendor.id }
      });

      if (products.length === 0) {
        return res
          .status(404)
          .json({ status: "fail", message: req.t("productnotfound") });
      }
      return res
        .status(200)
        .json({ status: req.t("success"), products: products });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  }

  static async disableProduct(req, res) {
    const { searchParam } = req.query;

    try {
      const existingVendor = await Vendor.findOne({
        where: { UserId: req.user.id }
      });
      const vendor = existingVendor.toJSON();
      const productsToUpdate = await Product.findAll({
        where: {
          productId: searchParam,
          [Op.or]: [{ quantity: 0 }, { expired: true }],
          VendorId: vendor.id
        }
      });

      if (productsToUpdate.length === 0) {
        return res
          .status(404)
          .json({ status: "fail", message: req.t("productnotfound") });
      }

      const productIdsToUpdate = productsToUpdate.map(
        (product) => product.productId
      );
      // update product available to false
      await Product.update(
        { available: false },
        { where: { productId: productIdsToUpdate } }
      );

      return res
        .status(200)
        .json({ status: "success", message: req.t("productupdated") });
    } catch (error) {
      return res.status(500).json({ status: "error", error: error.message });
    }
  }

  static async enableProduct(req, res) {
    const { searchParam } = req.query;

    try {
      const existingVendor = await Vendor.findOne({
        where: { UserId: req.user.id }
      });
      const vendor = existingVendor.toJSON();
      const productsToUpdate = await Product.findAll({
        where: {
          productId: searchParam,
          [Op.or]: [{ quantity: { [Op.ne]: 0 } }, { expired: false }],
          VendorId: vendor.id
        }
      });

      if (productsToUpdate.length === 0) {
        return res
          .status(404)
          .json({ status: "fail", message: req.t("productnotfound") });
      }

      const productIdsToUpdate = productsToUpdate.map(
        (product) => product.productId
      );
      // update product available to true
      await Product.update(
        { available: true },
        { where: { productId: productIdsToUpdate } }
      );
      return res
        .status(200)
        .json({ status: "success", message: req.t("productupdated") });
    } catch (error) {
      return res.status(500).json({ status: "error", error: error.message });
    }
  }
}

export default ProductController;
