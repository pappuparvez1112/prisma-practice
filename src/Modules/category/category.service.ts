import { Category, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// const getUsers = async () => {
//   const result = await prisma.user.findMany({
//     // select: {
//     //   email: true,
//     //   name: true,
//     // },
//     include: {
//       profile: true,
//     },
//   });
//   return result;
// };
// const getSingleUsers = async (id: number) => {
//   const result = await prisma.user.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       profile: true,
//     },
//   });
//   return result;
// };

const insertIntoDB = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
  });
  return result;
};

// const insertOrUpdateProfile = async (data: Profile): Promise<Profile> => {
//   const isExist = await prisma.profile.findUnique({
//     where: {
//       userId: data.userId,
//     },
//   });

//   if (isExist) {
//     const result = await prisma.profile.update({
//       where: {
//         userId: data.userId,
//       },
//       data: {
//         bio: data.bio,
//       },
//     });
//     return result;
//   }
//   const result = await prisma.profile.create({
//     data,
//   });
//   return result;
// };

export const CategoryService = {
  insertIntoDB,
  //   insertOrUpdateProfile,
  //   getUsers,
  //   getSingleUsers,
};
