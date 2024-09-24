import { Document, Types } from "mongoose";

export interface AuthDocument extends Document {
  email:string;
  password:string;
  profile_image:string;
  isDeleted: boolean;
}
