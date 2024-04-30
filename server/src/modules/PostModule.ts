import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  creator_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  creatorName: String,
  image: String,
  content: String,
  created_at: { type: Date, default: Date.now },
});

export const Post = mongoose.model("Posts", postSchema);
