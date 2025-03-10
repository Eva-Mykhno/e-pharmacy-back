import createHttpError from "http-errors";
import { getAllPharmacies, getPharmacyById } from "../services/pharmacies.js";
import { parsePaginationParams } from "../middlewares/parsePaginationParams.js";

export const getPharmaciesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const pharmacies = await getAllPharmacies({
    page,
    perPage,
  });

  res.json({
    status: 200,
    message: "Successfully found pharmacies",
    data: pharmacies,
  });
};

export const getPharmacyByIdController = async (req, res, next) => {
  const { id } = req.params;
  const pharmacy = await getPharmacyById(id);

  if (!pharmacy) {
    throw createHttpError(404, "Pharmacy not found");
  }

  res.json({
    status: 200,
    message: `Successfully found pharmacy by ${id}`,
    data: pharmacy,
  });
};
