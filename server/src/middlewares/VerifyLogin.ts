import {
  ExpressMiddlewareInterface,
  UnauthorizedError,
} from "routing-controllers";
import { AuthentificatedRequest } from "../AuthentificatedRequest/AuthentificatedRequest";
import { NextFunction, Response } from "express";
import { inject, injectable } from "inversify";
import { TokenServices } from "../services/TokenServices";
import { JwtPayload } from "jsonwebtoken";

@injectable()
export class VerifyLogin implements ExpressMiddlewareInterface {
  constructor(
    @inject(TokenServices) private readonly tokenServices: TokenServices
  ) {}
  use(req: AuthentificatedRequest, _: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    if (!authHeaders) {
      throw new UnauthorizedError("You must login first");
    }
    const token = authHeaders.split(" ")[1];
    const decodedToken = this.tokenServices.decodeToken(token) as JwtPayload;
    if (!req.user) {
      req.user = {
        id: "",
      };
    }
    req.user.id = decodedToken.id;
    next();
  }
}
