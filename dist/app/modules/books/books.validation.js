"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookValidation = void 0;
const zod_1 = require("zod");
const createBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        author: zod_1.z.string(),
        author_image: zod_1.z.string(),
        genre: zod_1.z.string(),
        user: zod_1.z.object({
            email: zod_1.z.string(),
        }),
        publication_date: zod_1.z.string(),
        image_link: zod_1.z.string(),
    }),
});
const updateBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
        author_image: zod_1.z.string().optional(),
        genre: zod_1.z.string().optional(),
        user: zod_1.z.object({
            email: zod_1.z.string(),
        }),
        publication_date: zod_1.z.string().optional(),
        image_link: zod_1.z.string().optional(),
    }),
});
const createReviewBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is Required!" }),
        review: zod_1.z.string({ required_error: "Review is Required!" }),
    }),
});
exports.bookValidation = {
    createBookZodSchema,
    updateBookZodSchema,
    createReviewBookZodSchema,
};
