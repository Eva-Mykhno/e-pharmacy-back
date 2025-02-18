import { Router } from "express";
import {
  getUserByIdController,
  loginUserController,
  registerUserController,
} from "../controllers/users.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { loginUserSchema, registerUserSchema } from "../validation/users.js";

const usersRouter = Router();

usersRouter.post(
  "api/user/register",
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController)
);

usersRouter.post(
  "api/user/login",
  validateBody(loginUserSchema),
  loginUserController
);

usersRouter.get("/api/user/user-info", ctrlWrapper(getUserByIdController));

export default usersRouter;
