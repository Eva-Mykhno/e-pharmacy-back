import { parsePaginationParams } from "../middlewares/parsePaginationParams.js";
import { getNearestPharmacies } from "../services/nearestPharmacies.js";

export const getNearestPharmaciesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const nearestPharmacies = await getNearestPharmacies({
    page,
    perPage,
  });

  res.json({
    status: 200,
    message: "Successfully found nearest pharmacies",
    data: nearestPharmacies,
  });
};
