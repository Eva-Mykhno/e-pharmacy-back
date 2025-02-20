import { model, Schema } from "mongoose";

const pharmacySchema = new Schema(
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
    isOpen: {
      type: String,
      enum: ["open", "close"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const PharmaciesCollection = model("pharmacies", pharmacySchema);
