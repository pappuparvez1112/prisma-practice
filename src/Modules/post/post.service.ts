import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// const getAllPost = async () => {
//   const result = await prisma.post.findMany({
//     // select: {
//     //   email: true,
//     //   name: true,
//     // },
//     include: {
//       author: true,
//       category: true,
//     },
//   });
//   return result;
// };

const getAllPost = async (options: any) => {
  const { sortBy, sortOrder, searchTerm, page, limit } = options;
  const skip = parseInt(limit) * parseInt(page) - parseInt(limit) || 0;
  const take = parseInt(limit) || 10;
  return await prisma.$transaction(async (tx) => {
    const result = await tx.post.findMany({
      skip,
      take,
      // select: {
      //   email: true,
      //   name: true,
      // },
      include: {
        author: true,
        category: true,
      },
      orderBy:
        sortBy && sortOrder
          ? {
              [sortBy]: sortOrder,
            }
          : { createdAt: "desc" },
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            author: {
              name: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      //   createdAt: "desc",
    });
    const total = await tx.post.count();
    return { data: result, total };
  });
};
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

const insertIntoDB = async (data: Post): Promise<Post> => {
  const result = await prisma.post.create({
    data,
  });
  return result;
};

const updatePost = async (
  id: number,
  payload: Partial<Post>
): Promise<Post | number> => {
  // const result = await prisma.post.update({
  //   where: {
  //     id,
  //   },
  //   data: payload,
  // });
  // return result;

  // Raw database access
  const result =
    await prisma.$executeRaw`update posts set title=${payload.title} where id=${id}`;
  return result;
};
const deletePost = async (id: number): Promise<Post> => {
  const result = await prisma.post.delete({
    where: {
      id,
    },
  });
  return result;
};

const learnAggregateAndGrouping = async () => {
  // const result = await prisma.post.aggregate({
  //   _avg: {
  //     authorId: true,
  //     categoryId: true,
  //   },
  //   _count: {
  //     authorId: true,
  //   },
  //   _sum: {
  //     authorId: true,
  //   },
  // });
  const result = await prisma.post.groupBy({
    by: ["title"],
    _count: {
      title: true,
      authorId: true,
    },
  });
  return result;
};

export const PostService = {
  insertIntoDB,
  getAllPost,

  updatePost,
  deletePost,
  learnAggregateAndGrouping,
};
