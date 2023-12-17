import { Document } from "mongoose";
import Priority from "./enums/Priority";

export interface Task extends Document {
  userId: string;
  title: string;
  content: string;
  completed: boolean;
  dueDate: Date;
  priority: Priority;
}
