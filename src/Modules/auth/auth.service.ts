import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import { jwtHelpers } from "../../helpers/jwtHelper";
import UserModel from "../user/user.model";
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from "./auth.interface";

const prisma = new PrismaClient();

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  //**** access to our static method */
  const isUserExist = await prisma.user.findUnique({ where: { email } });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  const PasswordMatched = await bcrypt.compare(password, isUserExist.password);

  if (!PasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  //create access token & refresh token
  const { email: adminPhoneNumber, role } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { adminPhoneNumber, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { adminPhoneNumber, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.expires_in as string
  );

  // console.log({
  //   accessToken,
  //   refreshToken,
  // });

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
  }

  const { adminPhoneNumber } = verifiedToken;
  // console.log(UserId, 'userId', verifiedToken);

  // user delete hoice kintu  refresh token ase
  // checking deleted user's refresh token

  const isUserExist = await UserModel.isUserExist(adminPhoneNumber);
  // console.log(isUserExist);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
