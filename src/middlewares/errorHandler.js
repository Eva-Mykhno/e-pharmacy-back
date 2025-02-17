import { HttpError } from "http-errors";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err,
    });
    return;
  }

  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });

  res.status(401).json({
    message: "Unauthorized",
    error: err.message,
  });

  res.status(400).json({
    message: "Bad Request",
    error: err.message,
  });
};
