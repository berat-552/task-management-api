import express from "express";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

const router = express.Router();

router.route("/").get(getTasks);

router.route("/:id").get(getTask);

router.route("/").post(createTask);

router.route("/:id").put(updateTask);

router.route("/:id").delete(deleteTask);

export default router;
