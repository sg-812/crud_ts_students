import { Schema, model } from "mongoose";
import { AuthDocument } from "../../../interface/AuthInterface";

const AuthSchema = new Schema<AuthDocument>(
  {
    email: { type: String, default: "", index: true },
    password: { type: String, default: "", index: true },
    profile_image: { type: String, default: "", index: true },
    isDeleted: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

export const authModel = model<AuthDocument>("Auth", AuthSchema);
export type { AuthDocument };
