import { Router } from "express";
import { getAllProducts, getProductById } from "../services/products.js";

const router = Router();

router.get("/api/products", async (req, res) => {
  const products = await getAllProducts();

  res.status(200).json({
    data: products,
  });
});

router.get("/api/products/:id", async (req, res, next) => {
  const { id } = req.params;
  const product = await getProductById(id);

  if (!product) {
    res.status(404).json({
      message: "Product not found",
    });
    return;
  }

  res.status(200).json({
    data: product,
  });
});

export default router;
