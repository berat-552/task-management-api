import mongoose, { Schema, Document } from "mongoose";

interface Task extends Document {
  userId: string;
  title: string;
  content: string;
  completed: boolean;
  dueDate: Date;
}

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
  },
  { timestamps: true }
);

const Task = mongoose.model<Task>("Task", taskSchema);

export default Task;
