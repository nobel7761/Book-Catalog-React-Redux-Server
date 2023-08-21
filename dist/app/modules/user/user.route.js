"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post("/signup", (0, validateRequest_1.default)(user_validation_1.userValidation.createUserZodSchema), user_controller_1.UserController.createUser);
router.post("/login", (0, validateRequest_1.default)(user_validation_1.userValidation.loginZodSchema), user_controller_1.UserController.loginUser);
router.post("/logout", (0, validateRequest_1.default)(user_validation_1.userValidation.logoutZodSchema), user_controller_1.UserController.logoutUser);
router.get("/:email", user_controller_1.UserController.getUserByEmail);
//wish-list
router.patch("/wish-list/:id", (0, validateRequest_1.default)(user_validation_1.userValidation.updateFeaturedListZodSchema), user_controller_1.UserController.updateWishList);
//read-soon
router.patch("/read-soon/:id", (0, validateRequest_1.default)(user_validation_1.userValidation.updateFeaturedListZodSchema), user_controller_1.UserController.updateReadSoonList);
//read-future
router.patch("/read-future/:id", (0, validateRequest_1.default)(user_validation_1.userValidation.updateFeaturedListZodSchema), user_controller_1.UserController.updateReadFutureList);
//finish-reading
router.patch("/finish-reading/:id", (0, validateRequest_1.default)(user_validation_1.userValidation.updateFeaturedListZodSchema), user_controller_1.UserController.updateFinishReadingList);
exports.UserRoutes = router;
