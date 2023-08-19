import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";

const UserSchema = new Schema<IUser, UserModel>(
  {
    name: { type: String, required: true },
    password: { type: String, required: true, select: 0 }, // select: 0 means, password will not return when a user will be created
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: true, unique: true },
    wishList: { type: Array, required: true },
    readSoon: { type: Array, required: true },
    readFuture: { type: Array, required: true },
    finishReading: { type: Array, required: true },
  },
  {
    timestamps: true, //for getting the createdAt, updatedAt from mongoose
  }
);

export const User = model<IUser, UserModel>("User", UserSchema);
