"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const books_constant_1 = require("./books.constant");
const books_service_1 = require("./books.service");
const getAllBooks = (0, catchAsync_1.default)(async (req, res) => {
    const filters = (0, pick_1.default)(req.query, books_constant_1.booksFilterableFields);
    const result = await books_service_1.BookService.getAllBooks(filters);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Books Retrieved Successfully",
        meta: result.meta,
        data: result.data,
    });
});
const getAllReviews = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await books_service_1.BookService.getAllReviews(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Reviews Retrieved Successfully",
        data: result.data,
    });
});
const createReviewByBookId = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const review = req.body;
    const result = await books_service_1.BookService.createReviewByBookId(id, review);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Review Added successfully",
        data: result,
    });
});
const createBook = (0, catchAsync_1.default)(async (req, res) => {
    const { ...bookData } = req.body;
    const result = await books_service_1.BookService.createBook(bookData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book created successfully",
        data: result,
    });
});
const getSingleBook = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await books_service_1.BookService.getSingleBook(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Single Book retrieved successfully",
        data: result,
    });
});
const updateBookById = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await books_service_1.BookService.updateBookById(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book updated successfully",
        data: result,
    });
});
const deleteBookById = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await books_service_1.BookService.deleteBookById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book deleted successfully",
        data: result,
    });
});
exports.BookController = {
    getAllBooks,
    createBook,
    getSingleBook,
    updateBookById,
    deleteBookById,
    getAllReviews,
    createReviewByBookId,
};
