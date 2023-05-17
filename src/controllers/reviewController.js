/* istanbul ignore file */
/* istanbul ignore file */
import { Op } from "sequelize";

import { Product, Review, User } from "../database/models";

class ReviewController {
  static async createReview(req, res) {
    try {
        const { title,content,rating, } = req.body;
        const userId = req.user.id;
        const productId = req.params.id;
       
        const existingProduct = await Product.findByPk(productId);
        if (!existingProduct) {
          return res.status(404).json({ status: "fail", message: "Product not found." });
        }
        const existingReview = await Review.findOne({ where: { productId, userId } });
        if (existingReview) {
          return res.status(409).json({ status: "fail", message: "You have already reviewed this product." });
        }
        const review = await Review.create({
          productId,
          userId,
          title,
          content,
          rating,
          
        });
        return res.status(201).json({ status: "success", review });

      } catch (error) {
        return res.status(500).json({ status: "fail", error: error.message });
      }
    }
  
    static async updateReview(req, res) {
      try {
        const { rating, content } = req.body;
        const reviewId = req.params.id;
        const userId = req.user.id;
        const existingReview = await Review.findOne({ where: { id: reviewId, userId } });
        if (!existingReview) {
          return res.status(404).json({ status: "fail", message: "Review not found." });
        }
        const review = await existingReview.update({ rating, content });
        return res.status(200).json({ status: "success", review });
      } catch (error) {
        return res.status(500).json({ status: "fail", error: error.message });
      }
    }
  
    static async deleteReview(req, res) {
      try {
        const reviewId = req.params.id;
        const userId = req.user.id;
        const existingReview = await Review.findOne({ where: { id: reviewId, userId } });
        if (!existingReview) {
          return res.status(404).json({ status: "fail", message: "Review not found." });
        }
        await existingReview.destroy();
        return res.status(204).json({ status: "success", message: "Review deleted." });
      } catch (error) {
        return res.status(500).json({ status: "fail", error: error.message });
      }
    }
  
    static async getProductReviews(req, res) {
      try {
        const productId = req.params.id;
        const existingProduct = await Product.findByPk(productId);
        if (!existingProduct) {
          return res.status(404).json({ status: "fail", message: "Product not found." });
        }
        const reviews = await Review.findAll({
          where: { productId },
          include: [{ model: User, attributes: ["firstName", "lastName"] }]
        });
        return res.status(200).json({ status: "success", data: reviews });
      } catch (error) {
        return res.status(500).json({ status: "fail", error: error.message });
      }
    }
  


  static async getProductRate(req, res) {

    try{
    const productId = req.params.id;
    const product = await Product.findByPk(productId);
  
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
  
    // get product reviews and calculate average rating
    const reviews = await product.getReviews();
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
  
    res.status(200).json({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      averageRating, 
      reviews 
    });
  }catch(error){
   res.status(500).json({status:"fail",error:error.message});
  }
  };

  
}

export default ReviewController;