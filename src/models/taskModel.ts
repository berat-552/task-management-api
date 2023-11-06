import mongoose, { Schema, Document } from "mongoose";

interface Task extends Document {
  userId: String;
  title: string;
  content: string;
  completed: boolean;
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
  },
  { timestamps: true }
);

const Task = mongoose.model<Task>("Task", taskSchema);

export default Task;
