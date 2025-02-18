import createHttpError from "http-errors";
import { getAllProducts, getProductById } from "../services/products.js";

export const getProductsController = async (req, res) => {
  const products = await getAllProducts();

  res.json({
    status: 200,
    message: "Successfully found all products",
    data: products,
  });
};

export const getProductByIdController = async (req, res, next) => {
  const { id } = req.params;
  const product = await getProductById(id);

  if (!product) {
    throw createHttpError(404, "Product not found");
  }

  res.json({
    status: 200,
    message: `Successfully found product by ${id}`,
    data: product,
  });
};
