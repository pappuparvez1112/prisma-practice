import express from "express";
import { PostController } from "./post.controller";

const router = express.Router();
// router.get("/", (req, res) => {
//   res.send("hello prisma");
// });

router.get("/", PostController.getAllPost);
router.get("/learn-query", PostController.learnAggregateAndGrouping);

// router.get("/:id", CategoryController.getSingleUsers);
router.post("/create-post", PostController.insertIntoDB);
router.patch("/:id", PostController.updatePost);
router.delete("/:id", PostController.deletePost);
// router.post("/profile", CategoryController.insertOrUpdateProfile);

export const PostRoutes = router;
