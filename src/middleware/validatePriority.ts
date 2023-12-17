import { Request, Response, NextFunction } from "express";
import Priority from "../types/enums/Priority";

const validatePriority = (req: Request, res: Response, next: NextFunction) => {
  const priority = req.body.priority;

  if (
    priority !== Priority.High &&
    priority !== Priority.Medium &&
    priority !== Priority.Low
  ) {
    res.status(400).json({
      error: `Invalid priority, must be ${Priority.High}, ${Priority.Medium}, or ${Priority.Low}`,
    });
  } else {
    next();
  }
};

export default validatePriority;
