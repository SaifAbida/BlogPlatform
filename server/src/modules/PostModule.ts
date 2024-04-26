import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  creator_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  image: String,
  content: String,
  created_at: { type: Date, default: Date.now },
});

export const Post = mongoose.model("Posts", postSchema);
