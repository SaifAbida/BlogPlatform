import { PostRepository } from "../repository/PostRepository";
import { inject, injectable } from "inversify";
import { CreatePostType } from "../types/Types";
import { NotFoundError, UnauthorizedError } from "routing-controllers";
import { UserRepository } from "../repository/UserRepository";

@injectable()
export class PostServices {
  constructor(
    @inject(PostRepository) private readonly postRepository: PostRepository,
    @inject(UserRepository) private readonly userRepository: UserRepository
  ) {}

  async createPost(userID: string, post: CreatePostType) {
    const user = await this.userRepository.findOne(userID);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    const creatorName = user.username;
    const newPost = await this.postRepository.create(userID, creatorName, post);
    user.posts = [...new Set([...user.posts, newPost._id])];
    await this.userRepository.save(user);
    return newPost;
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
    if (userID !== updatePost.creator_id.toString()) {
      throw new UnauthorizedError("Your are not authorized");
    }
    return await this.postRepository.update(postID, post);
  }

  async deletePost(userID: string, postID: string) {
    const deletePost = await this.postRepository.findOne(postID);
    if (!deletePost) {
      throw new NotFoundError("Post not found");
    }
    const user = await this.userRepository.findOne(userID);

    if (user._id.toString() !== deletePost.creator_id.toString()) {
      throw new UnauthorizedError("Your are not authorized");
    }
    user.posts = user.posts.filter(
      (postID) => postID.toString() !== deletePost._id.toString()
    );
    await this.userRepository.save(user);
    return await this.postRepository.delete(postID);
  }
}
