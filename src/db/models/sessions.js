import { model, Schema } from "mongoose";

const sessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const SessionsCollection = model("sessions", sessionSchema);
