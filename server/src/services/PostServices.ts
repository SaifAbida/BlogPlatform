import { PostRepository } from "../repository/PostRepository";
import { inject, injectable } from "inversify";
import { CreatePostType } from "../types/Types";
import { NotFoundError, UnauthorizedError } from "routing-controllers";
import { ObjectIDServices } from "./ObjectIDservices";

@injectable()
export class PostServices {
  constructor(
    @inject(PostRepository) private readonly postRepository: PostRepository,
    @inject(ObjectIDServices)
    private readonly objectIDServices: ObjectIDServices
  ) {}

  async createPost(userID: string, post: CreatePostType) {
    return await this.postRepository.create(userID, post);
  }

  async getPosts() {
    return await this.postRepository.findAll();
  }

  async getUserPosts(id: string) {
    return await this.postRepository.findUserPosts(id);
  }

  async getPost(id: string) {
    const post = await this.postRepository.findOne(id);
    if (!post) {
      throw new NotFoundError("Post not found");
    }
    return post;
  }

  async updatePost(userID: string, postID: string, post: CreatePostType) {
    const updatePost = await this.postRepository.findOne(postID);
    if (!updatePost) {
      throw new NotFoundError("Post not found");
    }
    const userObjectID = this.objectIDServices.convertToObjID(userID);
    if (userObjectID !== updatePost.creator_id) {
      throw new UnauthorizedError("This post is not related to this user");
    }
    return await this.postRepository.update(postID, post);
  }

  async deletePost(userID: string, postID: string) {
    const deletePost = await this.postRepository.findOne(postID);
    if (!deletePost) {
      throw new NotFoundError("Post not found");
    }
    const userObjectID = this.objectIDServices.convertToObjID(userID);
    if (userObjectID !== deletePost.creator_id) {
      throw new UnauthorizedError("This post is not related to this user");
    }
    return await this.postRepository.delete(postID);
  }
}
