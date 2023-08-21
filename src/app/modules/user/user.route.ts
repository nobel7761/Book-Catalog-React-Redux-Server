import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserController } from "./user.controller";
import { userValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(userValidation.createUserZodSchema),
  UserController.createUser
);

router.post(
  "/login",
  validateRequest(userValidation.loginZodSchema),
  UserController.loginUser
);

router.post(
  "/logout",
  validateRequest(userValidation.logoutZodSchema),
  UserController.logoutUser
);

router.get("/:email", UserController.getUserByEmail);

//wish-list
router.patch(
  "/wish-list/:id",
  validateRequest(userValidation.updateFeaturedListZodSchema),
  UserController.updateWishList
);

//read-soon
router.patch(
  "/read-soon/:id",
  validateRequest(userValidation.updateFeaturedListZodSchema),
  UserController.updateReadSoonList
);

//read-future
router.patch(
  "/read-future/:id",
  validateRequest(userValidation.updateFeaturedListZodSchema),
  UserController.updateReadFutureList
);

//finish-reading
router.patch(
  "/finish-reading/:id",
  validateRequest(userValidation.updateFeaturedListZodSchema),
  UserController.updateFinishReadingList
);

export const UserRoutes = router;
