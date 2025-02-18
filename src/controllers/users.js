import createHttpError from "http-errors";
import { getUserById, loginUser, registerUser } from "../services/users.js";

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: "User registration successful",
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const user = await loginUser(req.body);

  res.json({
    status: 200,
    message: "Successfully logged in an user",
    data: user,
  });
};

export const getUserByIdController = async (req, res, next) => {
  const { id } = req.params;
  const user = await getUserById(id);

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  res.json({
    status: 200,
    message: `Successfully found user by ${id}`,
    data: user,
  });
};
