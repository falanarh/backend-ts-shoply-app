import { Request, Response } from "express";
import { Shirts, Pants, Shoes } from "../models/FashionProduct";

// Fungsi untuk menambahkan produk fashion baru
export const addFashionProduct = async (req: Request, res: Response) => {
  const { fashionType } = req.body;

  try {
    let newFashionProduct;
    if (fashionType === "shirts") {
      newFashionProduct = await Shirts.create(req.body);
    } else if (fashionType === "pants") {
      newFashionProduct = await Pants.create(req.body);
    } else if (fashionType === "shoes") {
      newFashionProduct = await Shoes.create(req.body);
    } else {
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid fashionType",
      });
    }

    res.status(201).json({
      statusCode: 201,
      message: `${fashionType} created successfully`,
      data: newFashionProduct,
    });
  } catch (error) {
    const err = error as Error;
    console.error("Error in addFashionProduct:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
      error: err.message,
    });
  }
};

// Fungsi untuk mendapatkan semua produk fashion
export const getAllFashionProducts = async (req: Request, res: Response) => {
  try {
    const shirts = await Shirts.find();
    const pants = await Pants.find();
    const shoes = await Shoes.find();
    const fashionProducts = [...shirts, ...pants, ...shoes];
    
    res.status(200).json({
      statusCode: 200,
      message: "Fashion products retrieved successfully",
      data: fashionProducts,
    });
  } catch (error) {
    const err = error as Error;
    console.error("Error in getAllFashionProducts:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
      error: err.message,
    });
  }
};

// Fungsi untuk mendapatkan detail produk fashion berdasarkan ID dan fashionType
export const getFashionProductById = async (req: Request, res: Response) => {
  const { id, fashionType } = req.params;
  
  try {
    let fashionProduct;
    if (fashionType === "shirts") {
      fashionProduct = await Shirts.findById(id);
    } else if (fashionType === "pants") {
      fashionProduct = await Pants.findById(id);
    } else if (fashionType === "shoes") {
      fashionProduct = await Shoes.findById(id);
    } else {
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid fashionType",
      });
    }

    if (!fashionProduct) {
      return res.status(404).json({
        statusCode: 404,
        message: "Fashion Product not found",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "Fashion product retrieved successfully",
      data: fashionProduct,
    });
  } catch (error) {
    const err = error as Error;
    console.error("Error in getFashionProductById:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
      error: err.message,
    });
  }
};

// Fungsi untuk memperbarui produk fashion berdasarkan ID dan fashionType
export const updateFashionProduct = async (req: Request, res: Response) => {
  const { id, fashionType } = req.params;
  
  try {
    let updatedFashionProduct;
    if (fashionType === "shirts") {
      updatedFashionProduct = await Shirts.findByIdAndUpdate(id, req.body, { new: true });
    } else if (fashionType === "pants") {
      updatedFashionProduct = await Pants.findByIdAndUpdate(id, req.body, { new: true });
    } else if (fashionType === "shoes") {
      updatedFashionProduct = await Shoes.findByIdAndUpdate(id, req.body, { new: true });
    } else {
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid fashionType",
      });
    }

    if (!updatedFashionProduct) {
      return res.status(404).json({
        statusCode: 404,
        message: "Fashion Product not found",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: `${fashionType} updated successfully`,
      data: updatedFashionProduct,
    });
  } catch (error) {
    const err = error as Error;
    console.error("Error in updateFashionProduct:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
      error: err.message,
    });
  }
};

// Fungsi untuk menghapus produk fashion berdasarkan ID dan fashionType
export const deleteFashionProduct = async (req: Request, res: Response) => {
  const { id, fashionType } = req.params;
  
  try {
    let deletedFashionProduct;
    if (fashionType === "shirts") {
      deletedFashionProduct = await Shirts.findByIdAndDelete(id);
    } else if (fashionType === "pants") {
      deletedFashionProduct = await Pants.findByIdAndDelete(id);
    } else if (fashionType === "shoes") {
      deletedFashionProduct = await Shoes.findByIdAndDelete(id);
    } else {
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid fashionType",
      });
    }

    if (!deletedFashionProduct) {
      return res.status(404).json({
        statusCode: 404,
        message: "Fashion Product not found",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: `${fashionType} deleted successfully`,
      data: deletedFashionProduct,
    });
  } catch (error) {
    const err = error as Error;
    console.error("Error in deleteFashionProduct:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
      error: err.message,
    });
  }
};