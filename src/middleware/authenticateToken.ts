import { Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ExtendedRequest } from "../types/ExtendedRequest";

const authenticateToken = asyncHandler(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    const accessTokenSecret = process.env.JWT_SECRET;

    if (token == null) {
      res.status(401);
      throw new Error("No token provided");
    }

    if (accessTokenSecret == null) {
      res.status(500);
      throw new Error("Secret key not available");
    }

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        res.status(403);
        return next(err); // Pass the error to the error handler
      }

      // Set the user data on the request object
      req.user = user as JwtPayload;

      next();
    });
  }
);

export default authenticateToken;
