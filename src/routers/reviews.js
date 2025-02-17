import { Router } from "express";
import { getAllReviews } from "../services/reviews.js";

const router = Router();

router.get("/api/customer-reviews", async (req, res) => {
  const reviews = await getAllReviews();

  res.status(200).json({
    data: reviews,
  });
});

export default router;
