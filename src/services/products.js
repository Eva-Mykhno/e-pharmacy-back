import { SORT_ORDER } from "../constants/index.js";
import { ProductsCollection } from "../db/models/products.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllProducts = async ({
  page,
  perPage,
  sortOrder = SORT_ORDER.ASC,
  sortBy = "_id",
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const productsQuery = ProductsCollection.find();

  if (filter.category) {
    productsQuery.where("category").equals(filter.category);
  }

  if (filter.name) {
    productsQuery.where("name").regex(filter.name, "i");
  }

  const [productsCount, products] = await Promise.all([
    ProductsCollection.countDocuments(productsQuery.getFilter()),
    productsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
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
