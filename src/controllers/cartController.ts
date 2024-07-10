import { Request, Response } from "express";
import Cart, { ICartItem } from "../models/Cart";
import Product from "../models/Product";
import User from "../models/User";

// Mendapatkan keranjang belanja pengguna
export const getCart = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return res.status(404).json({
        statusCode: 404,
        message: "Cart not found",
      });
    }
    res.status(200).json({
      statusCode: 200,
      message: "Cart retrieved successfully",
      data: cart,
    });
  } catch (error) {
    const err = error as Error;
    console.error("Error in getCart:", err);
    res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
  }
};

// Menambahkan item ke keranjang
export const addItemToCart = async (req: Request, res: Response) => {
  const { userId, productId, quantity, size, color, storage, ram } = req.body;

  try {
    // Check if userId exists in the database
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({
        statusCode: 404,
        message: "User not found",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        statusCode: 404,
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      const newItem: ICartItem = {
        productId,
        quantity,
        size,
        color,
        storage,
        ram,
      } as ICartItem;
      cart = new Cart({
        userId,
        items: [newItem],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) =>
          item.productId.toString() === productId &&
          (item.size ? item.size === size : true) &&
          (item.color ? item.color === color : true) &&
          (item.storage ? item.storage === storage : true) &&
          (item.ram ? item.ram === ram : true)
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        const newItem: ICartItem = {
          productId,
          quantity,
          size,
          color,
          storage,
          ram,
        } as ICartItem;
        cart.items.push(newItem);
      }
    }

    const savedCart = await cart.save();
    res.status(201).json({
      statusCode: 201,
      message: "Item added to cart successfully",
      data: savedCart,
    });
  } catch (error) {
    const err = error as Error;
    console.error("Error in addItemToCart:", err);
    res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
  }
};

// Mengubah properti item dalam keranjang
export const updateItemInCart = async (req: Request, res: Response) => {
  const {
    userId,
    productId,
    quantity,
    newQuantity,
    size,
    newSize,
    color,
    newColor,
    storage,
    newStorage,
    ram,
    newRam,
  } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        statusCode: 404,
        message: "Cart not found",
      });
    }
    const itemIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        (item.size ? item.size === size : true) &&
        (item.color ? item.color === color : true) &&
        (item.storage ? item.storage === storage : true) &&
        (item.ram ? item.ram === ram : true)
    );
    if (itemIndex === -1) {
      return res.status(404).json({
        statusCode: 404,
        message: "Item not found in cart",
      });
    }
    newQuantity ? (cart.items[itemIndex].quantity = newQuantity) : null;
    newSize ? (cart.items[itemIndex].size = newSize) : null;
    newColor ? (cart.items[itemIndex].color = newColor) : null;
    newStorage ? (cart.items[itemIndex].storage = newStorage) : null;
    newRam ? (cart.items[itemIndex].ram = newRam) : null;
    const updatedCart = await cart.save();
    res.status(200).json({
      statusCode: 200,
      message: "Item updated in cart successfully",
      data: updatedCart,
    });
  } catch (error) {
    const err = error as Error;
    console.error("Error in updateItemInCart:", err);
    res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
  }
};

// Menghapus item dari keranjang
export const removeItemFromCart = async (req: Request, res: Response) => {
  const { userId, productId, size, color, storage, ram } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        statusCode: 404,
        message: "Cart not found",
      });
    }
    const itemIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        (item.size ? item.size === size : true) &&
        (item.color ? item.color === color : true) &&
        (item.storage ? item.storage === storage : true) &&
        (item.ram ? item.ram === ram : true)
    );
    if (itemIndex === -1) {
      return res.status(404).json({
        statusCode: 404,
        message: "Item not found in cart",
      });
    }
    cart.items.splice(itemIndex, 1);
    const updatedCart = await cart.save();
    res.status(200).json({
      statusCode: 200,
      message: "Item removed from cart successfully",
      data: updatedCart,
    });
  } catch (error) {
    const err = error as Error;
    console.error("Error in removeItemFromCart:", err);
    res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
  }
};
