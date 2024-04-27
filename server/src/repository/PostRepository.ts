import mongoose from "mongoose";
import { PostInterface } from "../interfaces/PostInterface";
import { Post } from "../modules/PostModule";
import { CreatePostType, PostDocumentType } from "../types/Types";
import { injectable } from "inversify";

@injectable()
export class PostRepository implements PostInterface {
  private readonly database = Post;
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
  async findOne(id: string): Promise<PostDocumentType | null> {
    return await this.database.findById(id);
  }
  
  async update(
    userID: string,
    post: CreatePostType
  ): Promise<PostDocumentType> {
    return await this.database.findByIdAndUpdate(userID, post, { new: true });
  }
  async delete(id: string): Promise<boolean> {
    return await this.database.findByIdAndDelete(id);
  }
}
