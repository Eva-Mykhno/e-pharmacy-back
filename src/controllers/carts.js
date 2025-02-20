import createHttpError from "http-errors";
import { getCart, postCart, updateCart } from "../services/carts.js";

export const getCartController = async (req, res) => {
  const { userId } = req.user;
  const cart = await getCart(userId);

  res.json({
    status: 200,
    message: "Successfully found the cart",
    data: cart,
  });
};

export const updateCartController = async (req, res) => {
  const { userId } = req.user;
  const { productId, quantity } = req.body;

  const cart = await updateCart({ userId, productId, quantity });

  res.json({
    status: 200,
    message: "Successfully updated the cart",
    data: cart,
  });
};

export const postCartController = async (req, res) => {
  const { userId } = req.user;
  const { shippingInfo, paymentMethod } = req.body;

  if (!shippingInfo || !paymentMethod) {
    throw createHttpError(400, "This field is required");
  }

  const cart = await postCart({ userId, shippingInfo, paymentMethod });

  res.json({
    status: 200,
    message: "Order successfully placed",
    data: cart,
  });
};
