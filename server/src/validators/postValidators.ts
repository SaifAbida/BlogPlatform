import { IsNotEmpty, IsString } from "class-validator";

export class PostValidators {
  @IsString()
  image?: string;
  @IsNotEmpty()
  @IsString()
  content: string;
}
