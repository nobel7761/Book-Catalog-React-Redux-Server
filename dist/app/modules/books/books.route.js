"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./books.controller");
const books_validation_1 = require("./books.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = express_1.default.Router();
router.get("/book/:id", books_controller_1.BookController.getSingleBook);
router.get("/books", books_controller_1.BookController.getAllBooks);
router.get("/reviews/:id", books_controller_1.BookController.getAllReviews);
router.post("/add-new-book", (0, validateRequest_1.default)(books_validation_1.bookValidation.createBookZodSchema), books_controller_1.BookController.createBook);
router.delete("/:id", books_controller_1.BookController.deleteBookById);
router.patch("/book/:id", (0, validateRequest_1.default)(books_validation_1.bookValidation.updateBookZodSchema), books_controller_1.BookController.updateBookById);
router.patch("/review/:id", (0, validateRequest_1.default)(books_validation_1.bookValidation.createReviewBookZodSchema), books_controller_1.BookController.createReviewByBookId);
exports.BookRoutes = router;
