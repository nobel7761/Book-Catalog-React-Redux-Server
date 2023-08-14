import mongoose, { Schema, model } from "mongoose";
import { BookModel, IBook } from "./books.interace";

const reviewSchema = new mongoose.Schema({
  user: String,
  rating: Number,
  comment: String,
});

export const BookSchema = new Schema<IBook, BookModel>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    author_image: { type: String, required: true },
    genre: { type: String, required: true },
    user: {
      email: { type: String, required: true },
    },
    publication_date: { type: String, required: true },
    reviews: { type: [reviewSchema], required: true },
    image_link: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Book = model<IBook, BookModel>("Book", BookSchema);
