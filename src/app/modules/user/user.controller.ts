import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IBook } from "../books/books.interace";
import httpStatus from "http-status";
import { UserService } from "./user.service";
import { ILoginUserResponse } from "./user.interface";
import config from "../../../config";

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userData = req.body;
    const result = await UserService.createUser(userData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Created Successfully",
      data: result,
    });
  }
);

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await UserService.loginUser(loginData);

  const { refreshToken, ...others } = result as ILoginUserResponse;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === "production" ? true : false,
    httpOnly: true, // to make sure that this cookie won't be accessible from client side
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Logged In Successfully!",
    data: others,
  });
});

// const addToWishList = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const result = await UserService.addToWishList(id);

//   sendResponse<IBook>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Book Added To Wish List",
//     data: result,
//   });
// });

export const UserController = {
  createUser,
  //   addToWishList,
  loginUser,
};
