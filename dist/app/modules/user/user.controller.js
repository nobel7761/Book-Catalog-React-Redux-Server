"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const user_service_1 = require("./user.service");
const config_1 = __importDefault(require("../../../config"));
const createUser = (0, catchAsync_1.default)(async (req, res) => {
    const userData = req.body;
    const result = await user_service_1.UserService.createUser(userData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User Created Successfully",
        data: result,
    });
});
const loginUser = (0, catchAsync_1.default)(async (req, res) => {
    const loginData = req.body;
    const result = await user_service_1.UserService.loginUser(loginData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User Logged In Successfully!",
        data: result,
    });
});
const logoutUser = (0, catchAsync_1.default)(async (req, res) => {
    const cookieOptions = {
        secure: config_1.default.env === "production" ? true : false,
        httpOnly: true,
        expires: new Date(0), // Setting an expired date will delete the cookie
    };
    res.cookie("refreshToken", "", cookieOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User Logged Out Successfully!",
        data: null,
    });
});
const getUserByEmail = (0, catchAsync_1.default)(async (req, res) => {
    const email = req.params.email;
    const result = await user_service_1.UserService.getUserByEmail(email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User Retrived Successfully!",
        data: result,
    });
});
const updateWishList = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const { email } = req.body;
    const result = await user_service_1.UserService.updateWishList(id, email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Wish List Updated Successfully",
        data: result,
    });
});
const updateReadSoonList = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const { email } = req.body;
    const result = await user_service_1.UserService.updateReadSoonList(id, email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Read Soon List Updated Successfully",
        data: result,
    });
});
const updateReadFutureList = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const { email } = req.body;
    const result = await user_service_1.UserService.updateReadFutureList(id, email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Read Future List Updated Successfully",
        data: result,
    });
});
const updateFinishReadingList = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const { email } = req.body;
    const result = await user_service_1.UserService.updateFinishReadingList(id, email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Finish Reading List Updated Successfully",
        data: result,
    });
});
exports.UserController = {
    createUser,
    loginUser,
    logoutUser,
    getUserByEmail,
    updateWishList,
    updateReadSoonList,
    updateReadFutureList,
    updateFinishReadingList,
};
