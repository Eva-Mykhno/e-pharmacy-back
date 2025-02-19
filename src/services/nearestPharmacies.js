import { NearestPharmaciesCollection } from "../db/models/nearestPharmacies.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getNearestPharmacies = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const nearestPharmaciesQuery = NearestPharmaciesCollection.find();

  const [nearestPharmaciesCount, nearestPharmacies] = await Promise.all([
    NearestPharmaciesCollection.countDocuments(),
    nearestPharmaciesQuery.skip(skip).limit(limit).exec(),
  ]);

  const paginationData = calculatePaginationData(
    nearestPharmaciesCount,
    page,
    perPage
  );

  return {
    data: nearestPharmacies,
    ...paginationData,
  };
};
