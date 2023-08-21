"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true, select: 0 },
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: true, unique: true },
    wishList: { type: Array, required: true },
    readSoon: { type: Array, required: true },
    readFuture: { type: Array, required: true },
    finishReading: { type: Array, required: true },
}, {
    timestamps: true, //for getting the createdAt, updatedAt from mongoose
});
exports.User = (0, mongoose_1.model)("User", UserSchema);
