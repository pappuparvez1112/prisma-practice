import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();
// router.get("/", (req, res) => {
//   res.send("hello prisma");
// });

router.get("/", UserController.getUsers);
router.get("/:id", UserController.getSingleUsers);
router.post("/create-user", UserController.insertIntoDB);
router.post("/profile", UserController.insertOrUpdateProfile);

export const UserRoutes = router;
