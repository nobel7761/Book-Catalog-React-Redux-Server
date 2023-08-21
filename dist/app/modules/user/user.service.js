"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("./user.model");
const createUser = async (user) => {
    const existingUserEmail = await user_model_1.User.findOne({ email: user.email });
    if (existingUserEmail) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Email already exists!");
    }
    const existingUserContact = await user_model_1.User.findOne({ contact: user.contact });
    if (existingUserContact) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Contact Number already exists!");
    }
    const newUser = await user_model_1.User.create(user);
    if (!newUser.email) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create user");
    }
    const result = await user_model_1.User.findById({ _id: newUser._id }).select("-password");
    return result;
};
const loginUser = async (payload) => {
    const { email, password } = payload;
    const isUserExist = await user_model_1.User.findOne({ email: email });
    if (!isUserExist)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User Does Not Exists");
    if (isUserExist.password && isUserExist.password !== password)
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Password Does Not Match");
    return isUserExist;
};
const getUserByEmail = async (email) => {
    const result = await user_model_1.User.findOne({ email: email });
    return result;
};
const updateReadSoonList = async (id, email) => {
    const result = await user_model_1.User.findOne({ email: email });
    const bookexists = result?.readSoon?.includes(id);
    if (bookexists) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Book Already Added in Read Soon List");
    }
    result?.readSoon?.push(id);
    result?.save();
    return result;
};
const updateReadFutureList = async (id, email) => {
    const result = await user_model_1.User.findOne({ email: email });
    const bookexists = result?.readFuture?.includes(id);
    if (bookexists) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Book Already Added in Read Future List");
    }
    result?.readFuture?.push(id);
    result?.save();
    return result;
};
const updateFinishReadingList = async (id, email) => {
    const result = await user_model_1.User.findOne({ email: email });
    const bookexists = result?.finishReading?.includes(id);
    if (bookexists) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Book Already Added in Finish Reading List");
    }
    result?.finishReading?.push(id);
    result?.save();
    return result;
};
const updateWishList = async (id, email) => {
    const result = await user_model_1.User.findOne({ email: email });
    const bookexists = result?.wishList?.includes(id);
    if (bookexists) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Book Already Added in Wish List");
    }
    result?.wishList?.push(id);
    result?.save();
    return result;
};
exports.UserService = {
    createUser,
    loginUser,
    getUserByEmail,
    updateWishList,
    updateFinishReadingList,
    updateReadFutureList,
    updateReadSoonList,
};
