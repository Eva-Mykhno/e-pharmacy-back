import { ProductsCollection } from "../db/models/products.js";

export const getAllProducts = async () => {
  const products = await ProductsCollection.find();
  return products;
};

export const getProductById = async (id) => {
  const product = await ProductsCollection.findById(id);
  return product;
};
