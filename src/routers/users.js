import { Router } from "express";
import { getUserById } from "../services/users.js";

const router = Router();

router.get("/api/user/user-info", async (req, res, next) => {
  const { id } = req.params;
  const user = await getUserById(id);

  if (!user) {
    res.status(404).json({
      message: "Product not found",
    });
    return;
  }

  res.status(200).json({
    email: user.email,
    name: user.name,
  });
});
