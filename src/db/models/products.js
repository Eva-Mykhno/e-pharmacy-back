import { model, Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    photo: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    suppliers: {
      type: String,
    },
    stock: {
      type: String,
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Head", "Leg", "Heart", "Medicine"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ProductsCollection = model("products", ProductSchema);
