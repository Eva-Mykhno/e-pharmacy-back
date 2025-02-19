import { PharmaciesCollection } from "../db/models/pharmacies.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllPharmacies = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const pharmaciesQuery = PharmaciesCollection.find();

  const [pharmaciesCount, pharmacies] = await Promise.all([
    PharmaciesCollection.countDocuments(),
    pharmaciesQuery.skip(skip).limit(limit).exec(),
  ]);

  const paginationData = calculatePaginationData(
    pharmaciesCount,
    page,
    perPage
  );

  return {
    data: pharmacies,
    ...paginationData,
  };
};

export const getPharmacyById = async (id) => {
  const pharmacy = await PharmaciesCollection.findById(id);
  return pharmacy;
};
