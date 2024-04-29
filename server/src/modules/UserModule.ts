import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Posts" }],
});

export const User = mongoose.model("Users", userSchema);
