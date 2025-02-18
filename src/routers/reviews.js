import { Router } from "express";
import { getReviewsController } from "../controllers/reviews.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const reviewsRouter = Router();

reviewsRouter.get("/api/customer-reviews", ctrlWrapper(getReviewsController));

export default reviewsRouter;
