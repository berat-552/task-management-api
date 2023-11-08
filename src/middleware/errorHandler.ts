import { Request, Response, NextFunction } from "express";
import { constants } from "../constants";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    BAD_REQUEST,
    FORBIDDEN,
    INTERNAL_SERVER_ERROR,
    NOT_FOUND,
    UNAUTHORIZED,
  } = constants;

  const statusCode: number = res.statusCode || 500;

  switch (statusCode) {
    case NOT_FOUND:
      res.json({
        title: "Not found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case BAD_REQUEST:
      res.json({
        title: "Validation failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case FORBIDDEN:
      res.json({
        title: "Not allowed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case INTERNAL_SERVER_ERROR:
      res.json({
        title: "Internal Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case UNAUTHORIZED:
      res.json({
        title: "Unauthorized access",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log("No error");
      next();
      break;
  }
};

export default errorHandler;
