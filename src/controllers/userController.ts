import { Request, Response, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import { ExtendedRequest } from "../types/ExtendedRequest";
import tokenBlacklist from "../blacklist";
import Task from "../models/taskModel";

//@desc Register new user
//@route POST /api/users/register
//@access Public
const registerUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      res.status(400);
      throw new Error("User already registered");
    }

    const saltRounds: number = 10;
    const hashedPassword: string = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      username,
      email,
      password: hashedPassword, // store hashed password in db
    });

    if (user) {
      res.json({
        status: 201,
        message: "User registered successfully",
        user: {
          _id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } else {
      res.status(400);
      throw new Error("User data is not valid");
    }
  }
);

//@desc Login user
//@route POST /api/users/login
//@access private
const loginUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // compare password with hashed password from db
    const correctPassword = await bcrypt.compare(password, user.password);

    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
      res.status(500);
      throw new Error("Secret Key is not available");
    }

    if (user && correctPassword) {
      const token = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            userId: user.id,
          },
        },
        JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      res.json({
        status: 200,
        message: "Logged in",
        userId: user.id,
        email: user.email,
        accessToken: token,
      });
    } else {
      res.status(401);
      throw new Error("Incorrect email or password");
    }
  }
);

//@desc Logout User
//@route GET /api/users/logout
//@access private
const logoutUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // Access the user token from the request
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(400);
      throw new Error("Token not provided");
    }

    if (token) {
      // Add the token to the blacklist
      tokenBlacklist.add(token);
      res.json({ status: 200, message: "Logged out successfully" });
    }
  }
);

//@desc Provide current user information
//@route GET /api/users/info
//@access private
const currentUserInfo: RequestHandler = asyncHandler(
  async (req: ExtendedRequest, res: Response) => {
    // Access user information
    const user = req.user;

    if (user) {
      res.json({ status: 200, user });
    } else {
      res.status(401);
      throw new Error("User information not available");
    }
  }
);

//@desc DELETE user account
//@route DELETE /api/users/delete
//@access private
const deleteUser: RequestHandler = asyncHandler(
  async (req: ExtendedRequest, res: Response) => {
    const user = req.user;

    if (!user) {
      res.status(401);
      throw new Error("User information not available");
    }

    const userFound = await User.findById(user.user.userId);

    if (!userFound) {
      res.status(404);
      throw new Error("User cannot be deleted because user does not exist");
    }

    const userToDelete = await User.deleteOne({
      _id: user.user.userId,
    });

    if (!userToDelete) {
      res.status(404);
      throw new Error("User does not exist");
    }

    const deleteUserTasks = await Task.deleteMany({ userId: user.user.userId });

    if (userToDelete.deletedCount === 1) {
      res.status(200).json({
        message: "User data and tasks deleted successfully",
        username: user.user.username,
      });
    } else {
      res.status(500);
      throw new Error("Cannot delete user");
    }
  }
);

export { registerUser, loginUser, logoutUser, currentUserInfo, deleteUser };
