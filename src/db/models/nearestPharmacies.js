import { model, Schema } from "mongoose";

const nearestPharmacySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const NearestPharmaciesCollection = model(
  "nearest",
  nearestPharmacySchema
);
