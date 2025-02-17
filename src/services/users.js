import { UsersCollection } from "../db/models/users.js";

export const getUserById = async (id) => {
  const user = await UsersCollection.findById(id);
  return user;
};
