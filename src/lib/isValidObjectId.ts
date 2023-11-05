import mongoose from "mongoose";
export function isValidObjectId(str: string) {
  return mongoose.Types.ObjectId.isValid(str);
}
