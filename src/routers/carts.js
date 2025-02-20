import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  getCartController,
  postCartController,
  updateCartController,
} from "../controllers/carts.js";
import { authenticate } from "../middlewares/authenticate.js";

const cartsRouter = Router();

cartsRouter.use(authenticate);

cartsRouter.get("/api/cart", ctrlWrapper(getCartController));
cartsRouter.put("/api/cart/update", ctrlWrapper(updateCartController));
cartsRouter.post("/api/cart/checkout", ctrlWrapper(postCartController));

export default cartsRouter;
