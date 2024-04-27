import { Container } from "inversify";
import { PasswordServices } from "../services/PasswordServices";
import { TokenServices } from "../services/TokenServices";
import { UserServices } from "../services/UserServices";
import { PostRepository } from "../repository/PostRepository";
import { UserRepository } from "../repository/UserRepository";
import { VerifyLogin } from "../middlewares/VerifyLogin";
import { UserControllers } from "../controllers/UserControllers";

export const container = new Container();

container.bind<PasswordServices>(PasswordServices).toSelf();
container.bind<TokenServices>(TokenServices).toSelf();
container.bind<UserServices>(UserServices).toSelf();
container.bind<PostRepository>(PostRepository).toSelf();
container.bind<UserRepository>(UserRepository).toSelf();
container.bind<VerifyLogin>(VerifyLogin).toSelf();
container.bind<UserControllers>(UserControllers).toSelf();
