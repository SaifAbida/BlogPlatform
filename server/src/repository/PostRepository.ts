import mongoose from "mongoose";
import { PostInterface } from "../interfaces/PostInterface";
import { Post } from "../modules/PostModule";
import { CreatePostType, PostDocumentType } from "../types/Types";

export class PostRepository implements PostInterface {
  async create(
    userID: string,
    post: CreatePostType
  ): Promise<PostDocumentType> {
    const creator_id = new mongoose.Types.ObjectId(userID);
    const newPost = new this.database({ creator_id, post });
    return (await newPost.save()) as unknown as PostDocumentType;
  }
  async findAll(): Promise<PostDocumentType[]> {
    return await this.database.find();
  }
  async findUserPosts(id: string): Promise<PostDocumentType[]> {
    return await this.database.find({
      creator_id: new mongoose.Types.ObjectId(id),
    });
  }
  async findOne(id: string): Promise<PostDocumentType> {
    return await this.database.findById(id);
  }
  update(userID: string, postID: string): Promise<PostDocumentType> {
    throw new Error("Method not implemented.");
  }
  delete(userID: string, postID: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  private readonly database = Post;
}
