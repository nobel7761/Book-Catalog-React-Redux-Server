import express from "express";
import { BookController } from "./books.controller";
import { bookValidation } from "./books.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

// router.get("/:id", BookController.getBookById);
router.get("/", BookController.getAllBooks);
// create admin
router.post(
  "/create-book",
  validateRequest(bookValidation.createBookZodSchema),
  BookController.createBook
);
// router.delete("/:id", BookController.deleteBookById);

/* router.patch(
  "/:id",
  validateRequest(BookValidation.updateBookZodSchema),
  BookController.updateBookById
); */

export const BookRoutes = router;
