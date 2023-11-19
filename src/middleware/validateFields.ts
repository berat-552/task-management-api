import { Request, Response, NextFunction } from "express";

const validateFields =
  (requiredFields: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const missingFields = requiredFields.filter(
      (field) => !(field in req.body)
    );

    if (missingFields.length > 0) {
      res.status(400).json({
        status: 400,
        error: `Missing required fields: ${missingFields.join(", ")}`,
      });
    } else {
      next();
    }
  };

export default validateFields;
