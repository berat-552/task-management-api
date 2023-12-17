import { Document } from "mongoose";

export interface Blacklist extends Document {
  token: string;
  reason: string;
  createdAt: Date;
  expires: Date;
}
