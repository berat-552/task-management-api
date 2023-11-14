import mongoose, { Schema } from "mongoose";
import { User } from "../types/User";

const userSchema: Schema<User> = new Schema<User>(
  {
    username: {
      type: String,
      required: [true, "Please provide username"],
    },
    email: {
      type: String,
      required: [true, "Please provide email address"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model<User>("User", userSchema);

export default User;
