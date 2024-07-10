import mongoose, { Document, Model } from "mongoose";
import Product from "./Product";

// Interface untuk dokumen produk fashion
interface IFashionProduct extends Document {
  sizes: string[];
  colors: string[];
  fabric: string;
  length?: string;
  neck?: string;
  pattern?: string;
  subcategory: "mens" | "womens" | "kids";
}

// Define schemas for specific fashion types
const ShirtsSchema = new mongoose.Schema({
  sizes: {
    type: [String],
    required: true,
  },
  colors: {
    type: [String],
    required: true,
  },
  fabric: {
    type: String,
    required: true,
  },
  length: {
    type: String,
  },
  neck: {
    type: String,
  },
  pattern: {
    type: String,
  },
  subcategory: {
    type: String,
    enum: ["mens", "womens", "kids"],
    required: true,
  },
});

const PantsSchema = new mongoose.Schema({
  sizes: {
    type: [String],
    required: true,
  },
  colors: {
    type: [String],
    required: true,
  },
  fabric: {
    type: String,
    required: true,
  },
  length: {
    type: String,
  },
  pattern: {
    type: String,
  },
  subcategory: {
    type: String,
    enum: ["mens", "womens", "kids"],
    required: true,
  },
});

const ShoesSchema = new mongoose.Schema({
  sizes: {
    type: [String],
    required: true,
  },
  colors: {
    type: [String],
    required: true,
  },
  fabric: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    enum: ["mens", "womens", "kids"],
    required: true,
  },
});

// Define discriminators for specific fashion types
const Shirts: Model<IFashionProduct> = Product.discriminator<IFashionProduct>(
  "shirts",
  ShirtsSchema
);

const Pants: Model<IFashionProduct> = Product.discriminator<IFashionProduct>(
  "pants",
  PantsSchema
);

const Shoes: Model<IFashionProduct> = Product.discriminator<IFashionProduct>(
  "shoes",
  ShoesSchema
);

export { Shirts, Pants, Shoes };
