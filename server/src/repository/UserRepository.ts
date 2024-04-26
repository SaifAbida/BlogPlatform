import { UserInterface } from "../interfaces/UserInterface";
import { User } from "../modules/UserModule";
import { CreateUserType, UserDocumentType } from "../types/Types";

export class UserRepository implements UserInterface {
  private readonly database = User;

  async create(user: CreateUserType): Promise<UserDocumentType> {
    const newUser = new this.database(user);
    return (await newUser.save()) as unknown as UserDocumentType;
  }
  async findOne(id: string): Promise<UserDocumentType> {
    return await this.database.findById(id);
  }
  async update(id: string, user: CreateUserType): Promise<UserDocumentType> {
    return await this.database.findByIdAndUpdate(id, user, { new: true });
  }
  async delete(id: string): Promise<Boolean> {
    return await this.database.findByIdAndDelete(id);
  }
}
