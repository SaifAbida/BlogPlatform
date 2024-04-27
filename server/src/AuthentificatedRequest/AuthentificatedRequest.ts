import { Request } from "express";

interface AuthUserInterface {
  id: string;
}

export interface AuthentificatedRequest extends Request {
  user: AuthUserInterface;
}
