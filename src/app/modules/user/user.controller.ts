import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { UserService } from "./user.service";
import { ILoginUserResponse, IUser } from "./user.interface";
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

const getUserByEmail = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email;
  const result = await UserService.getUserByEmail(email);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Retrived Successfully!",
    data: result,
  });
});

const updateWishList = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { email } = req.body;

  const result = await UserService.updateWishList(id, email);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Wish List Updated Successfully",
    data: result,
  });
});

const updateReadSoonList = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { email } = req.body;

  const result = await UserService.updateReadSoonList(id, email);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Read Soon List Updated Successfully",
    data: result,
  });
});

const updateReadFutureList = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { email } = req.body;

  const result = await UserService.updateReadFutureList(id, email);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Read Future List Updated Successfully",
    data: result,
  });
});

const updateFinishReadingList = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const { email } = req.body;

    const result = await UserService.updateFinishReadingList(id, email);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Finish Reading List Updated Successfully",
      data: result,
    });
  }
);

export const UserController = {
  createUser,
  loginUser,
  logoutUser,
  getUserByEmail,
  updateWishList,
  updateReadSoonList,
  updateReadFutureList,
  updateFinishReadingList,
};
