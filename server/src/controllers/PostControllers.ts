import { PostServices } from "../services/PostServices";
import { VerifyLogin } from "../middlewares/VerifyLogin";
import { inject, injectable } from "inversify";
import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseBefore,
} from "routing-controllers";
import { AuthentificatedRequest } from "../AuthentificatedRequest/AuthentificatedRequest";
import { Response, Request } from "express";
import { PostValidators } from "../validators/postValidators";

@JsonController("/post")
@injectable()
export class PostControllers {
  constructor(
    @inject(PostServices) private readonly postServices: PostServices
  ) {}

  @Post("/")
  @UseBefore(VerifyLogin)
  async createPost(
    @Req() req: AuthentificatedRequest,
    @Body() post: PostValidators,
    @Res() res: Response
  ) {
    const newPost = await this.postServices.createPost(req.user.id, post);
    return res.status(200).json(newPost);
  }

  @Get("/all")
  @UseBefore(VerifyLogin)
  async getAllPosts(@Req() _: Request, @Res() res: Response) {
    const posts = await this.postServices.getPosts();
    return res.status(200).json(posts);
  }

  @Get("/")
  @UseBefore(VerifyLogin)
  async getMyPosts(@Req() req: AuthentificatedRequest, @Res() res: Response) {
    const posts = await this.postServices.getUserPosts(req.user.id);
    return res.status(200).json(posts);
  }

  @Get("/:id")
  async getPost(@Param("id") id: string, @Res() res: Response) {
    const post = await this.postServices.getPost(id);
    return res.status(200).json(post);
  }

  @Patch("/:id")
  @UseBefore(VerifyLogin)
  async updatePost(
    @Param("id") id: string,
    @Req() req: AuthentificatedRequest,
    @Body() post: PostValidators,
    @Res() res: Response
  ) {
    const updatedPost = await this.postServices.updatePost(
      req.user.id,
      id,
      post
    );
    return res.status(200).json(updatedPost);
  }

  @Delete("/:id")
  @UseBefore(VerifyLogin)
  async deletePost(
    @Param("id") id: string,
    @Req() req: AuthentificatedRequest,
    @Res() res: Response
  ) {
    await this.postServices.deletePost(req.user.id, id);
    return res.status(200).json({ message: "post deleted successfully" });
  }
}
