import { Request, Response, NextFunction } from "express";
import Blacklist from "../models/blacklistModel";
("../blacklist");

const isTokenBlacklisted = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ error: "Token not provided" });
  }

  const existingToken = await Blacklist.findOne({ token });

  if (existingToken) {
    res.status(400).json({ error: "Token is blacklisted" });
  } else {
    next();
  }
};

export default isTokenBlacklisted;
