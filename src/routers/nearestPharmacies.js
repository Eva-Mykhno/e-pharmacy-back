import { Router } from "express";
import { getNearestPharmaciesController } from "../controllers/nearestPharmacies.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const nearestPharmaciesRouter = Router();

nearestPharmaciesRouter.get(
  "/api/stores/nearest",
  ctrlWrapper(getNearestPharmaciesController)
);

export default nearestPharmaciesRouter;
