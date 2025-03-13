import createHttpError from "http-errors";
import { CartCollection } from "../db/models/carts.js";
import { OrdersCollection } from "../db/models/orders.js";
import { ProductsCollection } from "../db/models/products.js";

export const getCart = async (userId) => {
  const cart = await CartCollection.findOne({ user: userId }).populate(
    "products.product"
  );

  return cart ? cart.products : [];
};

export const updateCart = async ({ userId, productId, quantity }) => {
  let cart = await CartCollection.findOne({ user: userId });

  if (!cart) {
    cart = new CartCollection({ user: userId, products: [] });
  }

  const productIndex = cart.products.findIndex(
    (p) => p.product.toString() === productId
  );

  if (productIndex > -1) {
    cart.products[productIndex].quantity += quantity;
  } else {
    const product = await ProductsCollection.findById(productId);
    if (!product) {
      throw createHttpError(404, "Product not found");
    }

    cart.products.push({
      product: productId,
      name: product.name,
      category: product.category,
      price: product.price,
      quantity, 
    });
  }

  await cart.save();
  return cart;
};

export const postCart = async ({ userId, shippingInfo, paymentMethod }) => {
  const cart = await CartCollection.findOne({ user: userId })
    .populate("products.product")
    .lean();

  if (!cart || cart.products.length === 0) {
    throw createHttpError(400, "Cart is empty");
  }

  const total = cart.products.reduce(
    (sum, item) => sum + (item.product?.price ?? 0) * item.quantity,
    0
  );

  const order = new OrdersCollection({
    user: userId,
    products: cart.products.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    })),
    shippingInfo,
    paymentMethod,
    total,
  });

  await order.save();
  await CartCollection.deleteOne({ user: userId });

  return order;
};
