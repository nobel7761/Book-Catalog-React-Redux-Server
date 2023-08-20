import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
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
  const loginData = req.body;
  const result = await UserService.loginUser(loginData);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Logged In Successfully!",
    data: result,
  });
});

const logoutUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const cookieOptions = {
      secure: config.env === "production" ? true : false,
      httpOnly: true,
      expires: new Date(0), // Setting an expired date will delete the cookie
    };
    res.cookie("refreshToken", "", cookieOptions);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Logged Out Successfully!",
      data: null,
    });
  }
);

export const UserController = {
  createUser,
  loginUser,
  logoutUser,
};
