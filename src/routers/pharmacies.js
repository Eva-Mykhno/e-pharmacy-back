import { Router } from "express";
import { getAllPharmacies } from "../services/pharmacies.js";

const router = Router();

router.get("/api/stores", async (req, res) => {
  const pharmacies = await getAllPharmacies();

  res.status(200).json({
    data: pharmacies,
  });
});

export default router;
