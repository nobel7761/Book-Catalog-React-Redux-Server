import express, { Application, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
import routes from "./app/routes/index";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//application routes
app.use("/api/v1", routes);

//testing route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//handle not found route
app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
});

export default app;
