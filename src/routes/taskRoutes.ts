import express from "express";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTasksByQuantity,
} from "../controllers/taskController";
import validateFields from "../middleware/validateFields";
import { requiredFieldsCreate, requiredFieldsUpdate } from "../constants";
import validateDate from "../middleware/validateDate";

const router = express.Router();

router.route("/:id").get(getTasks);

router.route("/task/:id").get(getTask);

router.route("/:id/:qty").get(getTasksByQuantity);

router
  .route("/")
  .post(validateFields(requiredFieldsCreate), validateDate, createTask);

router
  .route("/:id")
  .put(validateFields(requiredFieldsUpdate), validateDate, updateTask);

router.route("/:id").delete(deleteTask);

export default router;
