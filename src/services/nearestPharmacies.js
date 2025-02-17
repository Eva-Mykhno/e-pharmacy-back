import { NearestPharmaciesCollection } from "../db/models/nearestPharmacies.js";

export const getNearestPharmacies = async () => {
  const nearestPharmacies = await NearestPharmaciesCollection.find();
  return nearestPharmacies;
};
