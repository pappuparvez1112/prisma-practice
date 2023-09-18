import express from "express";

import { UserController } from "../user/user.controller";
import { AuthController } from "./auth.controller";

const router = express.Router();
router.post(
  "/signup",
  // validateRequest(UserValidation.createUserZodSchema),
  UserController.insertIntoDB
);

router.post(
  "/login",
  // validateRequest(AuthValidation.createLoginZodSchema),
  AuthController.loginUser
);
router.post(
  "/refresh-token",
  // validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

export const AuthRoutes = router;
