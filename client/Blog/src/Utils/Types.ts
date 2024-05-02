export type registerType = {
  username: string;
  email: string;
  password: string;
};

export type loginType = {
  username: string;
  password: string;
};

export type postDocumentType = {
  _id: string;
  creator_id: string;
  creatorName: string;
  image?: string;
  content: string;
  created_at: Date;
};

export type userDocumentType = {
  _id: string;
  username: string;
  email: string;
  password: string;
  posts: string[];
};

export type PostPropsType = {
  id: string;
  image?: string;
  creator_id: string;
  creatorName: string;
  content: string;
  created_at: Date;
  user_id: string;
  deletePost(id: string): void;
};

export type UpdateUserType = {
  username: string;
  email: string;
};

export type PasswordResetType = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
