import { Request, Response, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import Task from "../models/taskModel";
import { isValidObjectId } from "../lib/isValidObjectId";

//@desc Get all Tasks
//@route GET /api/contacts
//@access Public
const getTasks: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const tasks = await Task.find();

    if (!tasks) {
      res.status(404);
      throw new Error("Tasks not found");
    }

    res.json({ status: 200, tasks });
  }
);

const getTask: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const task = isValidObjectId(id) ? await Task.findById(id) : null;

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    res.json({ status: 200, task });
  }
);

const createTask: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, content, completed } = req.body;

    if (!title || !content || typeof completed !== "boolean") {
      res.status(400);
      throw new Error("All fields are required");
    }

    const task = await Task.create({
      title,
      content,
      completed,
    });

    if (task) {
      res.json({ status: 201, message: "Task created successfully", task });
    }
  }
);

const updateTask: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const { title, content, completed } = req.body;

    const taskExists = isValidObjectId(id) ? await Task.findById(id) : null;

    if (!taskExists) {
      res.status(404);
      throw new Error("Task not found");
    }

    const task = await Task.findByIdAndUpdate(
      id,
      {
        title,
        content,
        completed,
      },
      { new: true } //returns the updated document
    );
    res.json({ status: 200, updatedTask: task });
  }
);

const deleteTask: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const taskToDelete = await Task.findById(id);

    if (!taskToDelete) {
      res.status(400);
      throw new Error("Task to delete does not exist");
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      res.status(500);
      throw new Error(`Error deleting task with id: ${id}`);
    }

    res.json({ status: 200, message: `Deleted task with id: ${id}` });
  }
);

export { getTasks, getTask, createTask, updateTask, deleteTask };
