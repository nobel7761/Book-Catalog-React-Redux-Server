import { z } from "zod";

const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required!" }),
    email: z.string({ required_error: "Email is required!" }),
    contact: z.string({ required_error: "Contact Number is required!" }),
    password: z.string({ required_error: "Password is required!" }),
    wishList: z.array(z.string()),
    readSoon: z.array(z.string()),
    readFuture: z.array(z.string()),
    finishReading: z.array(z.string()),
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required!" }),
    password: z.string({ required_error: "Password is required!" }),
  }),
});

const logoutZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required!" }),
    password: z.string({ required_error: "Password is required!" }),
  }),
});

const updateFeaturedListZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "User Email is Required!" }),
  }),
});

export const userValidation = {
  createUserZodSchema,
  loginZodSchema,
  logoutZodSchema,
  updateFeaturedListZodSchema,
};
