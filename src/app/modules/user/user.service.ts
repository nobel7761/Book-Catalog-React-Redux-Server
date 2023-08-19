import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IBook } from "../books/books.interace";
import { ILoginUser, IUser } from "./user.interface";
import { User } from "./user.model";

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

const loginUser = async (payload: ILoginUser): Promise<IUser | null> => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({ email: email });

  if (!isUserExist)
    throw new ApiError(httpStatus.NOT_FOUND, "User Does Not Exists");

  if (isUserExist.password && isUserExist.password !== password)
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password Does Not Match");

  return isUserExist;
};

export const UserService = {
  createUser,
  loginUser,
};
