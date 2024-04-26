import { PostDocumentType, CreatePostType } from "../types/Types";

export interface PostInterface {
  create(userID: string, post: CreatePostType): Promise<PostDocumentType>;
  findAll(): Promise<PostDocumentType[]>;
  findUserPosts(id: string): Promise<PostDocumentType[]>;
  findOne(id: string): Promise<PostDocumentType | null>;
  update(userID: string, postID: string): Promise<PostDocumentType>;
  delete(userID: string, postID: string): Promise<boolean>;
}
