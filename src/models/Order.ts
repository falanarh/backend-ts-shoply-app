import mongoose, { Document, Model, Schema } from "mongoose";
import { IProduct } from "./Product";

// Interface untuk dokumen Order
interface IOrder extends Document {
  orderId: string;
  productId: mongoose.Types.ObjectId | IProduct; // Ubah tipe field productId
  productName: string;
  productImage: string;
  price: number;
  size: string;
  color: string;
  status:
    | "Order Received"
    | "Order Delivered"
    | "Order Returned"
    | "Order Exchanged"
    | "Order Cancelled";
  statusTimestamps: {
    status: string;
    timestamp: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

// Skema untuk Order
const OrderSchema = new Schema<IOrder>({
  orderId: { type: String, required: true, unique: true },
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true }, // Tambahkan ref ke Product
  productName: { type: String, required: true },
  productImage: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  status: {
    type: String,
    enum: [
      "Order Received",
      "Order Delivered",
      "Order Returned",
      "Order Exchanged",
      "Order Cancelled",
    ],
    required: true,
  },
  statusTimestamps: [
    {
      status: { type: String, required: true },
      timestamp: { type: Date, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware untuk memperbarui updatedAt sebelum menyimpan
OrderSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Model untuk Order
const Order: Model<IOrder> = mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
