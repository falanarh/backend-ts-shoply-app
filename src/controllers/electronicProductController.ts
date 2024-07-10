import { Request, Response } from "express";
import { Smartphone, Laptop } from "../models/ElectronicProduct";
import Product from "../models/Product";

// Fungsi untuk menambahkan produk elektronik baru
export const addElectronicProduct = async (req: Request, res: Response) => {
  const { subCategory } = req.body;

  try {
    let newProduct;
    if (subCategory === "smartphone") {
      newProduct = await Smartphone.create(req.body);
    } else if (subCategory === "laptop") {
      newProduct = await Laptop.create(req.body);
    } else {
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid subCategory",
      });
    }

    res.status(201).json({
      statusCode: 201,
      message: `${subCategory} created successfully`,
      data: newProduct,
    });
  } catch (error) {
    const err = error as Error;
    console.error("Error in addElectronicProduct:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
      error: err.message,
    });
  }
};

// Fungsi untuk mendapatkan semua produk elektronik
export const getAllElectronicProducts = async (req: Request, res: Response) => {
  try {
    const electronicProducts = await Product.find({})
      .where("kind")
      .in(["smartphone", "laptop"]);
    res.status(200).json({
      statusCode: 200,
      message: "Electronic products retrieved successfully",
      data: electronicProducts,
    });
  } catch (error) {
    const err = error as Error;
    console.error("Error in getAllElectronicProducts:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
      error: err.message,
    });
  }
};

// Fungsi untuk mendapatkan detail produk elektronik berdasarkan ID dan sub-kategori
export const getElectronicProductById = async (req: Request, res: Response) => {
  const { id, subCategory } = req.params;

  try {
    let electronicProduct;

    if (subCategory === "smartphone") {
      electronicProduct = await Smartphone.findById(id);
    } else if (subCategory === "laptop") {
      electronicProduct = await Laptop.findById(id);
    } else {
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid subCategory",
      });
    }

    if (!electronicProduct) {
      return res.status(404).json({
        statusCode: 404,
        message: `${subCategory} not found`,
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: `${subCategory} retrieved successfully`,
      data: electronicProduct,
    });
  } catch (error) {
    const err = error as Error;
    console.error("Error in getElectronicProductById:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
      error: err.message,
    });
  }
};

// Fungsi untuk memperbarui produk elektronik berdasarkan ID dan sub-kategori
export const updateElectronicProduct = async (req: Request, res: Response) => {
  const { id, subCategory } = req.params;
  try {
    let updatedProduct;
    if (subCategory === "smartphone") {
      updatedProduct = await Smartphone.findByIdAndUpdate(id, req.body, {
        new: true,
      });
    } else if (subCategory === "laptop") {
      updatedProduct = await Laptop.findByIdAndUpdate(id, req.body, {
        new: true,
      });
    } else {
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid subCategory",
      });
    }
    if (!updatedProduct) {
      return res.status(404).json({
        statusCode: 404,
        message: "Electronic Product not found",
      });
    }
    res.status(200).json({
      statusCode: 200,
      message: `${subCategory} updated successfully`,
      data: updatedProduct,
    });
  } catch (error) {
    const err = error as Error;
    console.error("Error in updateElectronicProduct:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
      error: err.message,
    });
  }
};

// Fungsi untuk menghapus produk elektronik berdasarkan ID dan sub-kategori
export const deleteElectronicProduct = async (req: Request, res: Response) => {
  const { id, subCategory } = req.params;
  try {
    let deletedProduct;
    if (subCategory === "smartphone") {
      deletedProduct = await Smartphone.findByIdAndDelete(id);
    } else if (subCategory === "laptop") {
      deletedProduct = await Laptop.findByIdAndDelete(id);
    } else {
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid subCategory",
      });
    }
    if (!deletedProduct) {
      return res.status(404).json({
        statusCode: 404,
        message: "Electronic Product not found",
      });
    }
    res.status(200).json({
      statusCode: 200,
      message: `${subCategory} deleted successfully`,
      data: deletedProduct,
    });
  } catch (error) {
    const err = error as Error;
    console.error("Error in deleteElectronicProduct:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
      error: err.message,
    });
  }
};
