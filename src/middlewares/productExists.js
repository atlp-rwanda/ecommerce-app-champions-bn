

/* eslint-disable require-jsdoc */
import { Product, Category } from "../database/models";

export async function IsProductExist(req, res, next) {
  try {
    const productId = req.params.id || req.body.product_id;
    const product = await Product.findOne({ where: { id: productId } });
    if (!product || product == null) {
      return res
        .status(404)
        .json({status: 'fail', message: "product does not exist" });
    }
    req.product = product;
    next();
  } catch (error) {
    return res.status(500).json({status: 'fail', error: "server error" });
  }
}

export async function productExistAlready(req, res, next) {
  try {
    const product = await Product.findOne({
      where: { productName: req.body.productName }
    });
    if (product) {
      return res
        .status(409)
        .json({status: 'fail', message: "product already exists" });
    }
    req.product = product;
    next();
  } catch (error) {
    return res.status(500).json({ status: 'fail', error: error.message });
  }
}

export async function categoryExistAlready(req, res, next) {
  try {
    const category = await Category.findOne({
      where: { name:req.body.name}
    });
    if (category) {
      return res.status(409).json({status: 'fail', message: "category already exists"});
    }
    req.category = category;
    next();
  } catch (error) {
    return res.status(500).json({status: "fail", error: error.message});
  }
}