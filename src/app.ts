import express, { Application } from "express";

import cors from "cors";
import { CategoryRoutes } from "./Modules/category/category.route";
import { PostRoutes } from "./Modules/post/post.route";
import { UserRoutes } from "./Modules/user/user.route";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/category", CategoryRoutes);
app.use("/api/v1/post", PostRoutes);

export default app;
