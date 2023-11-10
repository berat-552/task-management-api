import { Request, Response, NextFunction } from "express";
import tokenBlacklist from "../blacklist";
("../blacklist");

const isTokenBlacklisted = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    if (tokenBlacklist.has(token)) {
      res.status(401);
      throw new Error("Token is blacklisted");
    } else {
      next();
    }
  }

  if (!token) {
    res.status(400);
    throw new Error("Token not provided");
  }
};

export default isTokenBlacklisted;
