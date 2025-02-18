import { Router } from "express";

import {
  getProductByIdController,
  getProductsController,
} from "../controllers/products.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { isValidId } from "../middlewares/isValidId.js";

const productsRouter = Router();

productsRouter.get("/api/products", ctrlWrapper(getProductsController));
productsRouter.get(
  "/api/products/:id",
  isValidId,
  ctrlWrapper(getProductByIdController)
);

export default productsRouter;
