import { Request, Response, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import { ExtendedRequest } from "../types/ExtendedRequest";
import Task from "../models/taskModel";
import Blacklist from "../models/blacklistModel";

//@desc Register new user
//@route POST /api/v1/auth/register
//@access Public
const registerUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      res.status(409);
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
//@route POST /api/v1/auth/login
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

    const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;

    if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
      res.status(500);
      throw new Error("Secret Key is not available");
    }

    if (user && correctPassword) {
      const refreshToken = jwt.sign(
        {
          user: {
            userId: user.id,
          },
        },
        JWT_REFRESH_SECRET,
        {
          expiresIn: "7d",
        }
      );

      const accessToken = jwt.sign(
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
        accessToken,
        refreshToken,
      });
    } else {
      res.status(401);
      throw new Error("Incorrect email or password");
    }
  }
);

//@desc Logout User
//@route POST /api/v1/auth/logout
//@access private
const logoutUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    // Access the user token from the request
    const token = req.headers.authorization?.split(" ")[1];

    const newBlacklistEntry = new Blacklist({
      token,
      reason: "User logged out",
    });

    await newBlacklistEntry.save();

    res.json({ status: 200, message: "Logged out successfully" });
  }
);

//@desc Provide current user information
//@route GET /api/v1/auth/info
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
//@route DELETE /api/v1/auth/delete
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

    await Task.deleteMany({ userId: user.user.userId });

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
