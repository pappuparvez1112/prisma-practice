import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const UserModel = {
  async isUserExist(email: any) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  },

  async isPasswordMatched(givenPassword: any, savedPassword: any) {
    return await bcrypt.compare(savedPassword, givenPassword);
    // Add your password matching logic here
  },
};

export default UserModel;
