import { Request, Response, NextFunction } from "express";
import { isValid, parseISO } from "date-fns";
const validateDate = (req: Request, res: Response, next: NextFunction) => {
  const { dueDate } = req.body;

  const parsedDate: Date = parseISO(dueDate);

  if (!isValid(parsedDate)) {
    res.status(400).json({ error: "Invalid dueDate" });
  } else {
    next();
  }
};

export default validateDate;
