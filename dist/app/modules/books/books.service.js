"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const books_constant_1 = require("./books.constant");
const books_model_1 = require("./books.model");
const getAllBooks = async (filters) => {
    const { searchTerm, ...filtersData } = filters;
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: books_constant_1.bookSearchableFields.map((field) => ({
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
                }
                else {
                    return { [field]: value };
                }
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = await books_model_1.Book.find(whereConditions).sort({ createdAt: "desc" });
    const count = await books_model_1.Book.countDocuments(whereConditions);
    return {
        meta: {
            total: count,
        },
        data: result,
    };
};
const getAllReviews = async (id) => {
    const result = await books_model_1.Book.findOne({ _id: id }, { reviews: 1 });
    if (!result) {
        return {
            data: [],
        };
    }
    const reviews = result.reviews;
    return {
        data: reviews,
    };
};
const createReviewByBookId = async (id, payload) => {
    const result = await books_model_1.Book.findById({ _id: id });
    result?.reviews?.push(payload);
    result?.save();
    return result;
};
const createBook = async (payload) => {
    const result = await books_model_1.Book.create(payload);
    return result;
};
const getSingleBook = async (id) => {
    const result = await books_model_1.Book.findOne({ _id: id });
    return result;
};
const updateBookById = async (id, payload) => {
    const result = await books_model_1.Book.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};
const deleteBookById = async (id) => {
    const book = await books_model_1.Book.findOneAndDelete({ _id: id });
    return book;
};
exports.BookService = {
    getAllBooks,
    createBook,
    getSingleBook,
    updateBookById,
    deleteBookById,
    getAllReviews,
    createReviewByBookId,
};
