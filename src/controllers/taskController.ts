import { Request, Response, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import Task from "../models/taskModel";
import { isValidObjectId } from "../lib/isValidObjectId";

//@desc Get all Tasks
//@route GET /api/contacts
//@access Private
const getTasks: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!id) {
      res.status(400);
      throw new Error("Id not provided");
    }

    // tasks for that user
    const tasks = await Task.find({ userId: id });

    if (!tasks) {
      res.status(404);
      throw new Error("Tasks not found");
    }

    res.json({ status: 200, tasks });
  }
);

//@desc Get Task
//@route GET /api/contacts
//@access Private
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

//@desc Create Task
//@route POST /api/contacts
//@access Private
const createTask: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, content, completed, user_id, dueDate } = req.body;

    if (typeof completed !== "boolean") {
      res.status(400);
      throw new Error(
        "Invalid value for property 'complete', please provide a boolean value"
      );
    }

    const task = await Task.create({
      userId: user_id,
      title,
      content,
      completed,
      dueDate,
    });

    if (task) {
      res.json({ status: 201, message: "Task created successfully", task });
    } else {
      res.status(400);
      throw new Error("Invalid task data");
    }
  }
);

//@desc Update Task
//@route PUT /api/contacts/:id
//@access Private
const updateTask: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const { title, content, completed, dueDate } = req.body;

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
        dueDate,
      },
      { new: true } //returns the updated document
    );
    res.json({ status: 200, updatedTask: task });
  }
);

//@desc Delete Task
//@route DELETE /api/contacts/:id
//@access Private
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
