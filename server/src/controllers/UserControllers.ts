import { inject, injectable } from "inversify";
import { UserServices } from "../services/UserServices";
import {
  Body,
  Delete,
  Get,
  JsonController,
  Patch,
  Post,
  Req,
  Res,
  UseBefore,
} from "routing-controllers";
import { credentialsType, resetPasswordType } from "../types/Types";
import { Response } from "express";
import { VerifyLogin } from "../middlewares/VerifyLogin";
import { AuthentificatedRequest } from "../AuthentificatedRequest/AuthentificatedRequest";
import {
  CreateUserValidators,
  UpdateUserValidators,
} from "../validators/userValidators";

@injectable()
@JsonController("/user")
export class UserControllers {
  constructor(
    @inject(UserServices) private readonly userServices: UserServices
  ) {}

  @Post("/register")
  async register(@Body() user: CreateUserValidators, @Res() res: Response) {
    const newUser = await this.userServices.register(user);
    return res.status(200).json(newUser);
  }

  @Post("/login")
  async login(@Body() credentials: credentialsType, @Res() res: Response) {
    const token = await this.userServices.login(credentials);
    return res.status(200).json({ token });
  }

  @Get("/")
  @UseBefore(VerifyLogin)
  async getUser(@Req() req: AuthentificatedRequest, @Res() res: Response) {
    const user = await this.userServices.getUser(req.user.id);
    return res.status(200).json(user);
  }

  @Patch("/update")
  @UseBefore(VerifyLogin)
  async updateUser(
    @Req() req: AuthentificatedRequest,
    @Body() user: UpdateUserValidators,
    @Res() res: Response
  ) {
    const updatedUser = await this.userServices.updateUser(req.user.id, user);
    return res.status(200).json(updatedUser);
  }

  @Patch("/reset")
  @UseBefore(VerifyLogin)
  async resetPassword(
    @Body() reset: resetPasswordType,
    @Req() req: AuthentificatedRequest,
    @Res() res: Response
  ) {
    await this.userServices.resetPassword(req.user.id, reset);
    return res.status(200).json({ message: "Password changed successfully" });
  }

  @Delete("/")
  @UseBefore(VerifyLogin)
  async deleteUser(@Req() req: AuthentificatedRequest, @Res() res: Response) {
    await this.userServices.deleteUser(req.user.id);
    return res.status(200).json({ message: "User deleted successfully" });
  }
}
