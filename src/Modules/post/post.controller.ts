import { Request, Response } from "express";
import { PostService } from "./post.service";

// const getAllPost = async (req: Request, res: Response) => {
//   try {
//     const result = await PostService.getAllPost();
//     res.send({
//       success: true,
//       message: "Data fetched successfully",
//       data: result,
//     });
//   } catch (err) {
//     res.send(err);
//   }
// };
const getAllPost = async (req: Request, res: Response) => {
  console.log(req.query);
  const options = req.query;
  try {
    const result = await PostService.getAllPost(options);
    res.send({
      success: true,
      message: "Data fetched successfully",
      total: result.total,
      data: result.data,
    });
  } catch (err) {
    res.send(err);
  }
};

// const getSingleUsers = async (req: Request, res: Response) => {
//   try {
//     const result = await UserService.getSingleUsers(parseInt(req.params.id));
//     res.send({
//       success: true,
//       message: "Single Data fetched successfully",
//       data: result,
//     });
//   } catch (err) {
//     res.send(err);
//   }
// };
const insertIntoDB = async (req: Request, res: Response) => {
  try {
    const result = await PostService.insertIntoDB(req.body);
    res.send({
      success: true,
      message: "Post  successfully",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};
const updatePost = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  try {
    const result = await PostService.updatePost(id, data);
    res.send({
      success: true,
      message: "Post updated successfully",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};
const deletePost = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const result = await PostService.deletePost(id);
    res.send({
      success: true,
      message: "Post deleted successfully",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

const learnAggregateAndGrouping = async (req: Request, res: Response) => {
  try {
    const result = await PostService.learnAggregateAndGrouping();
    res.send({
      success: true,
      message: "result",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

export const PostController = {
  insertIntoDB,
  getAllPost,

  updatePost,
  deletePost,
  learnAggregateAndGrouping,
};
