import { UserRepository } from "../repository/UserRepository";
import { inject, injectable } from "inversify";
import {
  CreateUserType,
  UpdateUserType,
  credentialsType,
  resetPasswordType,
} from "../types/Types";
import { PasswordServices } from "./PasswordServices";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "routing-controllers";
import { TokenServices } from "./TokenServices";

@injectable()
export class UserServices {
  constructor(
    @inject(UserRepository) private readonly userRepository: UserRepository,
    @inject(PasswordServices)
    private readonly passwordServices: PasswordServices,
    @inject(TokenServices) private readonly tokenServices: TokenServices
  ) {}

  async register(user: CreateUserType) {
    user.password = await this.passwordServices.hashPassword(user.password);
    return await this.userRepository.create(user);
  }

  async login(credentials: credentialsType) {
    const existingUser = await this.userRepository.findByUsername(
      credentials.username
    );
    if (!existingUser) {
      throw new NotFoundError("User not found");
    }
    const verifyPassword = await this.passwordServices.verifyPassword(
      credentials.password,
      existingUser.password
    );
    if (!verifyPassword) {
      throw new UnauthorizedError("Incorrect password");
    }
    return this.tokenServices.createToken(existingUser._id);
  }

  async getUser(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }

  async updateUser(id: string, user: UpdateUserType) {
    const updatedUser = await this.userRepository.update(id, user);
    if (!updatedUser) {
      throw new NotFoundError("User not found");
    }
    return updatedUser;
  }

  async resetPassword(id: string, reset: resetPasswordType) {
    const user = await this.userRepository.findOne(id);
    const verifyCurrentPassword = await this.passwordServices.verifyPassword(
      reset.currentPassword,
      user.password
    );
    if (!verifyCurrentPassword) {
      throw new UnauthorizedError("Incorrect current password");
    }
    const verifyNewPassword = await this.passwordServices.verifyPassword(
      reset.newPassword,
      user.password
    );
    if (verifyNewPassword) {
      throw new BadRequestError(
        "You cannot set the new password to the current password"
      );
    }
    if (reset.newPassword !== reset.confirmPassword) {
      throw new BadRequestError(
        "The new password and the confirmation are not matching"
      );
    }
    const newHashedPassword = await this.passwordServices.hashPassword(
      reset.newPassword
    );
    user.password = newHashedPassword;
    return await this.userRepository.save(user);
  }

  async deleteUser(id: string) {
    const deletedUser = await this.userRepository.delete(id);
    if (!deletedUser) {
      throw new NotFoundError("User not found");
    }
    return true;
  }
}
