import express from "express";
import { BookRoutes } from "../modules/books/books.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/books",
    routes: BookRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;
