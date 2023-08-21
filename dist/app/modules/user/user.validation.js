"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required!" }),
        email: zod_1.z.string({ required_error: "Email is required!" }),
        contact: zod_1.z.string({ required_error: "Contact Number is required!" }),
        password: zod_1.z.string({ required_error: "Password is required!" }),
        wishList: zod_1.z.array(zod_1.z.string()),
        readSoon: zod_1.z.array(zod_1.z.string()),
        readFuture: zod_1.z.array(zod_1.z.string()),
        finishReading: zod_1.z.array(zod_1.z.string()),
    }),
});
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "Email is required!" }),
        password: zod_1.z.string({ required_error: "Password is required!" }),
    }),
});
const logoutZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "Email is required!" }),
        password: zod_1.z.string({ required_error: "Password is required!" }),
    }),
});
const updateFeaturedListZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "User Email is Required!" }),
    }),
});
exports.userValidation = {
    createUserZodSchema,
    loginZodSchema,
    logoutZodSchema,
    updateFeaturedListZodSchema,
};
