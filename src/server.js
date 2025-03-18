import express from "express";
import pino from "pino-http";
import cors from "cors";
import { env } from "./utils/env.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import nearestPharmaciesRouter from "./routers/nearestPharmacies.js";
import pharmaciesRouter from "./routers/pharmacies.js";
import productsRouter from "./routers/products.js";
import reviewsRouter from "./routers/reviews.js";
import usersRouter from "./routers/users.js";
import cookieParser from "cookie-parser";
import cartsRouter from "./routers/carts.js";

const PORT = Number(env("PORT", "3000"));

export const startServer = () => {
  const app = express();
  app.use(express.json());

  // app.use(cors());
  app.use(
    cors({
      origin: ["https://e-pharmacy-eva.vercel.app", "http://localhost:5173"],
      credentials: true,
      methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
      allowedHeaders: "Content-Type,Authorization",
    })
  );

  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: "pino-pretty",
      },
    })
  );

  app.get("/", (req, res) => {
    res.status(200).json({
      status: 200,
      message: "Home page E-Pharmacy!",
    });
  });

  app.use(nearestPharmaciesRouter);
  app.use(pharmaciesRouter);
  app.use(productsRouter);
  app.use(reviewsRouter);
  app.use(usersRouter);
  app.use(cartsRouter);

  app.use("*", notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};
