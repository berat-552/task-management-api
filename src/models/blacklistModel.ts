import mongoose, { Schema } from "mongoose";
import { Blacklist } from "../types/Blacklist";

const blacklistSchema: Schema<Blacklist> = new Schema<Blacklist>(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    reason: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Blacklist = mongoose.model("Blacklist", blacklistSchema);

export default Blacklist;
