import express from "express";
import {
  registerUser,
  loginUser,
  currentUserInfo,
} from "../controllers/userController";
import authenticateToken from "../middleware/authenticateToken";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

// authenticate token middleware on this route
router.get("/info", authenticateToken, currentUserInfo);

export default router;
