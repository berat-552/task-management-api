import express from "express";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTasksByQuantity,
  searchTasks,
} from "../controllers/taskController";
import validateFields from "../middleware/validateFields";
import { requiredFieldsCreate, requiredFieldsUpdate } from "../constants";
import validateDate from "../middleware/validateDate";
import checkUserExists from "../middleware/checkUserExists";
import validatePriority from "../middleware/validatePriority";

const router = express.Router();

router.route("/:id").get(checkUserExists, getTasks);

router.route("/task/:id").get(checkUserExists, getTask);

router.route("/search/:id").get(checkUserExists, searchTasks);

router.route("/:id/:qty").get(checkUserExists, getTasksByQuantity);

router
  .route("/")
  .post(
    validateFields(requiredFieldsCreate),
    validateDate,
    validatePriority,
    checkUserExists,
    createTask
  );

router
  .route("/:id")
  .put(
    validateFields(requiredFieldsUpdate),
    validateDate,
    validatePriority,
    updateTask
  );

router.route("/:id").delete(deleteTask);

export default router;
