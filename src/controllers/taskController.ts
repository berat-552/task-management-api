import { Request, Response, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import Task from "../models/taskModel";
import { isValidObjectId } from "../lib/isValidObjectId";

//@desc Retrieve all tasks for user
//@route GET /api/tasks/:id
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

    res.json({ status: 200, quantity: tasks.length, tasks });
  }
);

//@desc Retrieve single task for user
//@route GET /api/tasks/task/:id
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

//@desc Retrieve a specified number of tasks for a user
//@route GET /api/tasks/:id/:qty
//@access Private
const getTasksByQuantity: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const numberWanted = parseInt(req.params.qty);

    const tasks = await Task.find({ userId: id });

    if (!tasks) {
      res.status(404);
      throw new Error("Tasks not found");
    }

    if (numberWanted > tasks.length) {
      res.status(404);
      throw new Error(
        `Could not retrieve ${numberWanted} tasks because user has a total of ${tasks.length} tasks`
      );
    }

    const quantityOfTasks = tasks.splice(0, numberWanted);

    res.json({ status: 200, quantity: numberWanted, quantityOfTasks });
  }
);

//@desc Create Task
//@route POST /api/tasks
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
//@route PUT /api/tasks/:id
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
      { new: true } // returns the updated document
    );
    res.json({ status: 200, updatedTask: task });
  }
);

//@desc Delete Task
//@route DELETE /api/tasks/:id
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

export {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTasksByQuantity,
};
