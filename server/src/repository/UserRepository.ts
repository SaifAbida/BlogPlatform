import { injectable } from "inversify";
import { UserInterface } from "../interfaces/UserInterface";
import { User } from "../modules/UserModule";
import {
  CreateUserType,
  UpdateUserType,
  UserDocumentType,
} from "../types/Types";
import { Document } from "mongoose";

@injectable()
export class UserRepository implements UserInterface {
  private readonly database = User;

  async create(user: CreateUserType): Promise<UserDocumentType> {
    const newUser = new this.database(user);
    return (await newUser.save()) as unknown as UserDocumentType;
  }
  async save(user: UserDocumentType) {
    const document = user as Document & UserDocumentType;
    return await document.save();
  }

  async findOne(id: string): Promise<UserDocumentType | null> {
    return await this.database.findById(id);
  }
  async findByUsername(username: string): Promise<UserDocumentType | null> {
    return await this.database.findOne({ username });
  }
  async update(id: string, user: UpdateUserType): Promise<UserDocumentType> {
    return await this.database.findByIdAndUpdate(id, user, { new: true });
  }
  async delete(id: string): Promise<Boolean> {
    return await this.database.findByIdAndDelete(id);
  }
}
