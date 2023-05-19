import { Router } from "express";
import ReviewController from "../controllers/reviewController";
import  {verifyBuyer}  from "../middlewares/authenticate";
import ReviewSchema from "../validations/validateReview";
import { validate } from "../middlewares/validate";

const reviewRouter=Router();

reviewRouter.post("/createReview/:id",verifyBuyer,validate(ReviewSchema),ReviewController.createReview);
reviewRouter.patch("/updateReview/:id",verifyBuyer,ReviewController.updateReview);
reviewRouter.delete("/deleteReview/:id",verifyBuyer,ReviewController.deleteReview);
reviewRouter.get("/getProductReviews/:id",ReviewController.getProductReviews);
reviewRouter.get("/getProductRate/:id",ReviewController.getProductRate);





export default reviewRouter;

