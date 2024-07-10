import mongoose, { Document, Model } from "mongoose";

interface IProduct extends Document {
  name: string;
  price: number;
  category: "fashion" | "electronics";
  brand: string;
  rating: number;
  numReviews: number;
  description?: string;
}

// Buat schema untuk produk umum
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["fashion", "electronics"],
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
    },
  },
  {
    discriminatorKey: "kind",
    collection: "products",
  }
);

const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  ProductSchema
);

export { IProduct };

export default Product;