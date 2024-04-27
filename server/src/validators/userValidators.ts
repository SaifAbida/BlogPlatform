import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserValidators {
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  username: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @Length(5)
  password: string;
}

export class UpdateUserValidators {
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  username: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
