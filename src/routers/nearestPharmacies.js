import { Router } from "express";
import { getNearestPharmacies } from "../services/nearestPharmacies.js";

const router = Router();

router.get("/api/stores/nearest", async (req, res) => {
  const nearestPharmacies = await getNearestPharmacies();

  res.status(200).json({
    data: nearestPharmacies,
  });
});

export default router;
