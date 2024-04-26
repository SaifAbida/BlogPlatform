import mongoose from "mongoose";

export type UserDocumentType = {
  id: mongoose.Schema.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  posts?: {
    type: [{ type: mongoose.Schema.Types.ObjectId; ref: "Posts" }];
  };
};

export type CreateUserType = {
  username: string;
  email: string;
  password: string;
};

export type PostDocumentType = {
  id?: mongoose.Schema.Types.ObjectId;
  image?: string;
  content: string;
  created_at?: Date;
};

export type CreatePostType = {
  image?: string;
  content: string;
};
