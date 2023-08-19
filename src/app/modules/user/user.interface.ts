import { Model } from "mongoose";

export type IUser = {
  name: string;
  contact: string;
  email: string;
  password: string;
  wishList?: string[];
  readSoon?: string[];
  readFuture?: string[];
  finishReading?: string[];
};

export type ILoginUserResponse = {
  email: string;
};

export type ILoginUser = {
  email: string;
  password: string;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
