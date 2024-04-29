import { IsNotEmpty, IsString } from "class-validator";

export class PostValidators {
  image?: string;
  @IsNotEmpty()
  @IsString()
  content: string;
}
