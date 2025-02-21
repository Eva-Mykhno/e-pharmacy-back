import createHttpError from "http-errors";
import {
  getUserById,
  loginUser,
  logoutUser,
  refreshUsersSession,
  registerUser,
} from "../services/users.js";
import { ONE_DAY } from "../constants/index.js";

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: "Successfully registered a user!",
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.json({
    status: 200,
    message: "Successfully logged in!",
    data: {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie("refreshToken");

  res.status(204).send();
};

export const getUserByIdController = async (req, res, next) => {
  // const { id } = req.params;
  // const user = await getUserById(id);

  const user = await getUserById(req.user.userId);

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  res.json({
    status: 200,
    message: `Successfully found info about user`,
    data: user,
  });
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  res.json({
    status: 200,
    message: "Successfully refreshed a session!",
    data: {
      accessToken: session.accessToken,
    },
  });
};
