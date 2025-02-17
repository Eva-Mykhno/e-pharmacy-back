import { ReviewsCollection } from "../db/models/reviews.js";

export const getAllReviews = async () => {
  const reviews = await ReviewsCollection.find();
  return reviews;
};
