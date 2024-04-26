import { CreateUserType, UserDocumentType } from "../types/Types";

export interface UserInterface {
  create(user: CreateUserType): Promise<UserDocumentType>;
  update(id: string, user: CreateUserType): Promise<UserDocumentType>;
  findOne(id: string): Promise<UserDocumentType | null>;
  delete(id: string): Promise<Boolean>;
}
