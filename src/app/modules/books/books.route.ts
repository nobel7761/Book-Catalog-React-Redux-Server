import express from "express";
import { BookController } from "./books.controller";
import { bookValidation } from "./books.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.get("/book/:id", BookController.getSingleBook);
router.get("/books", BookController.getAllBooks);
// create admin
router.post(
  "/add-new-book",
  validateRequest(bookValidation.createBookZodSchema),
  BookController.createBook
);
// router.delete("/:id", BookController.deleteBookById);

router.patch(
  "/book/:id",
  validateRequest(bookValidation.updateBookZodSchema),
  BookController.updateBookById
);

export const BookRoutes = router;
