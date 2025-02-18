import { Router } from "express";
import {
  getPharmaciesController,
  getPharmacyByIdController,
} from "../controllers/pharmacies.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { isValidId } from "../middlewares/isValidId.js";

const pharmaciesRouter = Router();

pharmaciesRouter.get("/api/stores", ctrlWrapper(getPharmaciesController));
pharmaciesRouter.get(
  "/api/stores/:id",
  isValidId,
  ctrlWrapper(getPharmacyByIdController)
);

export default pharmaciesRouter;
