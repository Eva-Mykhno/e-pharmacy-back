import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { env } from "../utils/env.js";

const SECRET_KEY = env("JWT_KEY");

export const authenticate = async (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    next(createHttpError(401, "Please provide Authorization header"));
    return;
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    next(createHttpError(401, "Auth header should be of type Bearer"));
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    req.user = decoded;

    // req.user = { userId: decoded.userId };

    next();
  } catch {
    next(createHttpError(401, "Invalid token"));
    return;
  }
};
