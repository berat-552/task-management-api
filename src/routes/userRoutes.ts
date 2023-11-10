import express from "express";
import {
  registerUser,
  loginUser,
  currentUserInfo,
  logoutUser,
} from "../controllers/userController";
import authenticateToken from "../middleware/authenticateToken";
import isTokenBlacklisted from "../middleware/isTokenBlacklisted";
import validateFields from "../middleware/validateFields";
import { requiredFieldsLogin, requiredFieldsRegister } from "../constants";

const router = express.Router();

router.post("/register", validateFields(requiredFieldsRegister), registerUser);

router.post("/login", validateFields(requiredFieldsLogin), loginUser);

router.post("/logout", isTokenBlacklisted, logoutUser);

// authenticate token middleware on this route
router.get("/info", authenticateToken, currentUserInfo);

export default router;
