import { Model } from "mongoose";

export type IBook = {
  title: string;
  author: string;
  author_image: string;
  genre: string;
  user: {
    email: string;
  };
  publication_date: string;
  reviews?: IReview[];
  image_link: string;
};

export type IReview = {
  user: string;
  rating?: number;
  comment: string;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
