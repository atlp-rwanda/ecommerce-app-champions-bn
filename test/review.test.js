import { Op } from "sequelize";
import { Product, Review, User } from "../src/database/models";
import ReviewController from "../src/controllers/reviewController";


describe("ReviewController", () => {

  describe("createReview", () => {
    it("should create a new review", async () => {

      const req = {
        body: {
          title: "My Review",
          content: "This is my review.",
          rating: 4,
          productId: 1
        },
        user: {
          id: 1
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const existingProduct = {
        id: 1
      };
      const existingReview = null;
      const review = {
        id: 1,
        ...req.body
      };
      const createSpy = jest.spyOn(Review, "create").mockResolvedValueOnce(review);
      jest.spyOn(Product, "findByPk").mockResolvedValueOnce(existingProduct);
      jest.spyOn(Review, "findOne").mockResolvedValueOnce(existingReview);

    
      await ReviewController.createReview(req, res);

      expect(Product.findByPk).toHaveBeenCalledWith(req.body.productId);
      expect(Review.findOne).toHaveBeenCalledWith({ where: { productId: req.body.productId, userId: req.user.id } });
      expect(Review.create).toHaveBeenCalledWith({
        ...req.body,
        userId: req.user.id
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ status: "success", review });
      createSpy.mockRestore();
    });

    it("should return an error if the product does not exist", async () => {
    
      const req = {
        body: {
          title: "My Review",
          content: "This is my review.",
          rating: 4,
          productId: 1
        },
        user: {
          id: 1
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const existingProduct = null;
      const existingReview = null;
      jest.spyOn(Product, "findByPk").mockResolvedValueOnce(existingProduct);
      jest.spyOn(Review, "findOne").mockResolvedValueOnce(existingReview);

     
      await ReviewController.createReview(req, res);

      
      expect(Product.findByPk).toHaveBeenCalledWith(req.body.productId);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ status: "fail", message: "Product not found." });
    });
  });
});