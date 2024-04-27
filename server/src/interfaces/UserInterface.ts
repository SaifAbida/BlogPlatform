import { CreateUserType, UserDocumentType } from "../types/Types";

export interface UserInterface {
  create(user: CreateUserType): Promise<UserDocumentType>;
  update(id: string, user: CreateUserType): Promise<UserDocumentType>;
  findOne(id: string): Promise<UserDocumentType | null>;
  save(user: UserDocumentType): Promise<UserDocumentType | null>;
  findByUsername(username: string): Promise<UserDocumentType | null>;
  delete(id: string): Promise<Boolean>;
}
