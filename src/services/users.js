import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UsersCollection } from "../db/models/users.js";
import { SessionsCollection } from "../db/models/sessions.js";
import { env } from "../utils/env.js";

const SECRET_KEY = env("JWT_KEY");

export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({
    $or: [{ email: payload.email }, { phone: payload.phone }],
  });

  if (user) {
    throw createHttpError(409, "This email or phone is already in use");
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const loginUser = async (payload) => {
  if (!payload.email || !payload.password) {
    throw createHttpError(400, "Missing required fields");
  }

  const user = await UsersCollection.findOne({ email: payload.email });

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, "Unauthorized");
  }

  await SessionsCollection.deleteMany({ userId: user._id });

  const accessToken = jwt.sign({ userId: user._id }, SECRET_KEY, {
    expiresIn: "1h",
  });

  const refreshToken = jwt.sign({ userId: user._id }, SECRET_KEY, {
    expiresIn: "1d",
  });

  await SessionsCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};

export const getUserById = async (id) => {
  return await UsersCollection.findById(id);
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, "Session not found");
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, "Refresh token expired");
  }

  const accessToken = jwt.sign({ userId: session.userId }, SECRET_KEY, {
    expiresIn: "1h",
  });

  return { accessToken };
};
