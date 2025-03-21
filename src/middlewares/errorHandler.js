import { HttpError } from "http-errors";

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err,
    });
    return;
  }

  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
};
