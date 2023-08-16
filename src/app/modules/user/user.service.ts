import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IBook } from "../books/books.interace";
import { ILoginUser, ILoginUserResponse, IUser } from "./user.interface";
import { User } from "./user.model";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const createUser = async (user: IUser): Promise<IUser | null> => {
  const existingUserEmail = await User.findOne({ email: user.email });

  if (existingUserEmail) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already exists!");
  }

  const existingUserContact = await User.findOne({ contact: user.contact });

  if (existingUserContact) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Contact Number already exists!"
    );
  }

  const newUser = await User.create(user);

  if (!newUser.email) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
  }

  const result = await User.findById({ _id: newUser._id }).select("-password");

  return result;
};

const loginUser = async (
  payload: ILoginUser
): Promise<ILoginUserResponse | null> => {
  const { id, password } = payload;

  const isUserExist = await User.findById({ _id: id });

  if (!isUserExist)
    throw new ApiError(httpStatus.NOT_FOUND, "User Does Not Exists");

  if (isUserExist.password && isUserExist.password !== password)
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password Does Not Match");

  // if user exists and password match then JWT will generate a token witch will be sent from server side to client side. client side will store this token in the browser(localstorage/cookies) so that when user try to login for the next(hit the url) time then user does not need to give id, password again(if the token does not expired) to login. Then we'll send this token with every single request and server will check the token. if the token is authorized then user can make request and then server will give the access through route(so we need to handle this from route level). otherwise user will get failed.

  // create access token & refresh token
  const { id: userId } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { userId },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

/* const addToWishList = async (id: string): Promise<IBook | null> => {
  const result = await User.findById({ _id: id });

  result?.reviews?.push(payload);

  await result?.save();

  return result;
}; */

export const UserService = {
  createUser,
  //   addToWishList,
  loginUser,
};
