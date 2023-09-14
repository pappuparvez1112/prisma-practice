import express from "express";
import { CategoryController } from "./category.controller";

const router = express.Router();
// router.get("/", (req, res) => {
//   res.send("hello prisma");
// });

// router.get("/", CategoryController.getUsers);
// router.get("/:id", CategoryController.getSingleUsers);
router.post("/create-category", CategoryController.insertIntoDB);
// router.post("/profile", CategoryController.insertOrUpdateProfile);

export const CategoryRoutes = router;
