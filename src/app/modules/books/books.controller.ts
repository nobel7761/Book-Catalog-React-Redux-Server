import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import pick from "../../../shared/pick";
import { booksFilterableFields } from "./books.constant";
import { BookService } from "./books.service";
import { IBook, IReview } from "./books.interace";

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, booksFilterableFields);

  const result = await BookService.getAllBooks(filters);

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books Retrieved Successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BookService.getAllReviews(id);

  sendResponse<IReview[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reviews Retrieved Successfully",
    data: result.data,
  });
});

const createReviewByBookId = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const review = req.body;
  const result = await BookService.createReviewByBookId(id, review);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review Added successfully",
    data: result,
  });
});

const createBook = catchAsync(async (req: Request, res: Response) => {
  const { ...bookData } = req.body;
  const result = await BookService.createBook(bookData);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book created successfully",
    data: result,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.getSingleBook(id);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Book retrieved successfully",
    data: result,
  });
});

const updateBookById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await BookService.updateBookById(id, updatedData);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book updated successfully",
    data: result,
  });
});

const deleteBookById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.deleteBookById(id);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book deleted successfully",
    data: result,
  });
});

export const BookController = {
  getAllBooks,
  createBook,
  getSingleBook,
  updateBookById,
  deleteBookById,
  getAllReviews,
  createReviewByBookId,
};
