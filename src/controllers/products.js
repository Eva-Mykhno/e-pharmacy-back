import createHttpError from "http-errors";
import { getAllProducts, getProductById } from "../services/products.js";
import { parsePaginationParams } from "../middlewares/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";

export const getProductsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const products = await getAllProducts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

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
