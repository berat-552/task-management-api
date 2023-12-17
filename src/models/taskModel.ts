import mongoose, { Schema } from "mongoose";
import { Task } from "../types/Task";
import Priority from "../types/enums/Priority";

const taskSchema: Schema<Task> = new Schema<Task>(
  {
    userId: {
      type: String,
      required: [true, "Please provide a user id"],
    },
    title: {
      type: String,
      required: [true, "Please provide the task title"],
    },
    content: {
      type: String,
      required: [true, "Please provide the task content"],
    },
    completed: {
      type: Boolean,
      required: [true, "Please provide the task's completed value"],
    },
    dueDate: {
      type: Date,
      required: [true, "Please provide a due Date"],
    },
    priority: {
      type: String,
      enum: [Priority.High, Priority.Medium, Priority.Low],
      required: [true, "Please provide the task's priority level"],
    },
  },
  { timestamps: true }
);

const Task = mongoose.model<Task>("Task", taskSchema);

export default Task;
