import { ProductsCollection } from "../db/models/products.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllProducts = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const productsQuery = ProductsCollection.find();

  const [productsCount, products] = await Promise.all([
    ProductsCollection.countDocuments(),
    productsQuery.skip(skip).limit(limit).exec(),
  ]);

  const paginationData = calculatePaginationData(productsCount, page, perPage);

  return {
    data: products,
    ...paginationData,
  };
};

export const getProductById = async (id) => {
  const product = await ProductsCollection.findById(id);
  return product;
};
