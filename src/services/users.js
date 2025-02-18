import createHttpError from "http-errors";
import { UsersCollection } from "../db/models/users.js";

export const registerUser = async (payload) => {
  const user = await UsersCollection.create(payload);
  return user;
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  return user;
};

export const getUserById = async (id) => {
  const user = await UsersCollection.findById(id);
  return user;
};
