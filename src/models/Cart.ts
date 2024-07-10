import mongoose, { Document, Model } from "mongoose";
import { IProduct } from "./Product";

// Interface untuk item dalam Cart
interface ICartItem extends Document {
  productId: mongoose.Types.ObjectId | IProduct;
  quantity: number;
  size?: string;
  color?: string;
  storage?: string;
  ram?: string;
}

// Interface untuk dokumen Cart
interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  items: ICartItem[];
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  size: {
    type: String,
  },
  color: {
    type: String,
  },
  storage: {
    type: String,
  },
  ram: {
    type: String,
  },
});

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [CartItemSchema],
  totalPrice: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

CartSchema.pre("save", async function (next) {
  const cart = this as ICart;

  // Calculate totalPrice
  let total = 0;
  for (const item of cart.items) {
    const product = await mongoose.model("Product").findById(item.productId);
    if (product) {
      total += (product as IProduct).price * item.quantity;
    }
  }
  cart.totalPrice = total;

  // Update updatedAt
  cart.updatedAt = new Date();
  next();
});

const Cart: Model<ICart> = mongoose.model<ICart>("Cart", CartSchema);

export { ICartItem };
export default Cart;
