import { PharmaciesCollection } from "../db/models/pharmacies.js";

export const getAllPharmacies = async () => {
  const pharmacies = await PharmaciesCollection.find();
  return pharmacies;
};

export const getPharmacyById = async (id) => {
  const pharmacy = await PharmaciesCollection.findById(id);
  return pharmacy;
};
