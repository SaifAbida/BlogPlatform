import { injectable } from "inversify";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

@injectable()
export class TokenServices {
  createToken(id: mongoose.Schema.Types.ObjectId) {
    return jwt.sign({ id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24h",
    });
  }
  decodeToken(token: string) {
    return jwt.verify(token, process.env.TOKEN_SECRET_KEY);
  }
}
