import mongoose from "mongoose";

export type UserDocumentType = {
  _id: mongoose.Schema.Types.ObjectId;
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

export type UpdateUserType = {
  username: string;
  email: string;
};

export type resetPasswordType = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type PostDocumentType = {
  _id: mongoose.Schema.Types.ObjectId;
  image?: string;
  content: string;
  created_at?: Date;
};

export type CreatePostType = {
  image?: string;
  content: string;
};

export type credentialsType = {
  username: string;
  password: string;
};
