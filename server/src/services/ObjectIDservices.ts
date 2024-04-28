import { injectable } from "inversify";
import mongoose from "mongoose";

@injectable()
export class ObjectIDServices {
  convertToObjID(id: string) {
    return new mongoose.Schema.Types.ObjectId(id);
  }
}
