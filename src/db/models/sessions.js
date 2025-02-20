import { model, Schema } from "mongoose";

const sessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true, versionKey: false }
);

export const SessionsCollection = model("sessions", sessionSchema);
