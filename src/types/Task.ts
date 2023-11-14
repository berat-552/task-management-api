import { Document } from "mongoose";

export interface Task extends Document {
  userId: string;
  title: string;
  content: string;
  completed: boolean;
  dueDate: Date;
}
