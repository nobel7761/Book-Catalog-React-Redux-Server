import { z } from "zod";

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string(),
    author: z.string(),
    author_image: z.string(),
    genre: z.string(),
    user: z.object({
      email: z.string(),
    }),
    publication_date: z.string(),
    image_link: z.string(),
  }),
});

const updateBookZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    author_image: z.string().optional(),
    genre: z.string().optional(),
    user: z.object({
      email: z.string(),
    }),
    publication_date: z.string().optional(),
    image_link: z.string().optional(),
  }),
});

const createReviewBookZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is Required!" }),
    review: z.string({ required_error: "Review is Required!" }),
  }),
});

export const bookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
  createReviewBookZodSchema,
};
