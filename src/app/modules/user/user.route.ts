import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserController } from "./user.controller";
import { userValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/login",
  validateRequest(userValidation.loginZodSchema),
  UserController.loginUser
);

router.post(
  "/signup",
  validateRequest(userValidation.createUserZodSchema),
  UserController.createUser
);

// router.post(
//   "/wish-list/:id",
//   validateRequest(userValidation.addBookZodSchema),
//   UserController.addToWishList
// );

export const UserRoutes = router;
