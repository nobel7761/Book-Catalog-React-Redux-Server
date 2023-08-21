import { IGenericResponse } from "../../../interfaces/common";
import { IBookFilters, bookSearchableFields } from "./books.constant";
import { IBook, IReview } from "./books.interace";
import { Book } from "./books.model";

const getAllBooks = async (
  filters: IBookFilters
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        if (field === "publication_date") {
          const year = value.substring(0, 4);
          return {
            $expr: {
              $eq: [{ $substr: ["$publication_date", 0, 4] }, year],
            },
          };
        } else {
          return { [field]: value };
        }
      }),
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(whereConditions).sort({ createdAt: "desc" });
  const count = await Book.countDocuments(whereConditions);

  return {
    meta: {
      total: count,
    },
    data: result,
  };
};

const getAllReviews = async (
  id: string
): Promise<IGenericResponse<IReview[]>> => {
  const result = await Book.findOne({ _id: id }, { reviews: 1 });

  if (!result) {
    return {
      data: [],
    };
  }

  const reviews: IReview[] = result.reviews!;

  return {
    data: reviews,
  };
};

const createReviewByBookId = async (
  id: string,
  payload: IReview
): Promise<IBook | null> => {
  const result = await Book.findById({ _id: id });

  result?.reviews?.push(payload);

  result?.save();

  return result;
};

const createBook = async (payload: IBook): Promise<IBook> => {
  const result = await Book.create(payload);
  return result;
};

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findOne({ _id: id });
  return result;
};

const updateBookById = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteBookById = async (id: string): Promise<IBook | null> => {
  const book = await Book.findOneAndDelete({ _id: id });

  return book;
};

export const BookService = {
  getAllBooks,
  createBook,
  getSingleBook,
  updateBookById,
  deleteBookById,
  getAllReviews,
  createReviewByBookId,
};
