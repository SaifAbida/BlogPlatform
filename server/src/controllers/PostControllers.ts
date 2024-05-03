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
import multer from "multer";

//STORING IMAGES IN THE DATABASE (MIDDELWARE) :

let filename = "";
const myStorage = multer.diskStorage({
  destination: "./src/uploads",
  filename: (_, file, redirect) => {
    let date = Date.now();
    let fl = `${date}.${file.mimetype.split("/")[1]}`;
    redirect(null, fl);
    filename = fl;
  },
});
const upload = multer({ storage: myStorage });

//////////////////////////////////////////////////

@JsonController("/post")
@injectable()
export class PostControllers {
  constructor(
    @inject(PostServices) private readonly postServices: PostServices
  ) {}

  @Post("/")
  @UseBefore(VerifyLogin)
  @UseBefore(upload.any())
  async createPost(
    @Req() req: AuthentificatedRequest,
    @Body() { image, content }: PostValidators,
    @Res() res: Response
  ) {
    image = filename;
    const newPost = await this.postServices.createPost(req.user.id, {
      image,
      content,
    });
    filename = "";
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
  @UseBefore(upload.any())
  async updatePost(
    @Param("id") id: string,
    @Req() req: AuthentificatedRequest,
    @Body() { image, content }: PostValidators,
    @Res() res: Response
  ) {
    image = filename;
    const updatedPost = await this.postServices.updatePost(req.user.id, id, {
      image,
      content,
    });
    filename = "";
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
