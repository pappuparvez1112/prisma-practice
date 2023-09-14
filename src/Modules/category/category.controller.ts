import { Request, Response } from "express";

import { CategoryService } from "./category.service";

// const getUsers = async (req: Request, res: Response) => {
//   try {
//     const result = await UserService.getUsers();
//     res.send({
//       success: true,
//       message: "Data fetched successfully",
//       data: result,
//     });
//   } catch (err) {
//     res.send(err);
//   }
// };

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
    const result = await CategoryService.insertIntoDB(req.body);
    res.send({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

// const insertOrUpdateProfile = async (req: Request, res: Response) => {
//   try {
//     const result = await UserService.insertOrUpdateProfile(req.body);
//     res.send({
//       success: true,
//       message: "Profile  created/updated successfully",
//       data: result,
//     });
//   } catch (err) {
//     res.send(err);
//   }
// };

export const CategoryController = {
  insertIntoDB,
  //   insertOrUpdateProfile,
  //   getUsers,
  //   getSingleUsers,
};
