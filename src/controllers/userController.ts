import { Request, Response, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import { ExtendedRequest } from "../types/ExtendedRequest";

//@desc Register new user
//@route POST /api/users/register
//@access Public
const registerUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }

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

    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }

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
      res.json({ status: 200, message: "Logged in", accessToken: token });
    } else {
      res.status(401);
      throw new Error("Incorrect email or password");
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
      res.status(401).json({ message: "User information not available" });
    }
  }
);

export { registerUser, loginUser, currentUserInfo };
