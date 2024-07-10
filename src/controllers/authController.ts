import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const generateToken = (id: string, fullName: string, email: string) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign({ id, fullName, email }, secret, {
    expiresIn: "30d",
  });
};

export const signup = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        statusCode: 400,
        message: "User already exists",
      });
    }

    const user = await User.create({ fullName, email, password });

    res.status(201).json({
      statusCode: 201,
      message: "User created successfully",
      data: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        token: generateToken(user._id as string, user.fullName, user.email),
      },
    });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      // Kasus jika email tidak ditemukan
      return res.status(401).json({
        statusCode: 401,
        message: "Email not found",
      });
    }

    // Jika user ditemukan, lanjutkan untuk memeriksa password
    const isPasswordMatch = await user.matchPassword(password);

    if (isPasswordMatch) {
      // Jika password cocok, kirim respons berhasil login
      res.json({
        statusCode: 200,
        message: "Logged in successfully",
        data: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          token: generateToken(user._id as string, user.fullName, user.email),
        },
      });
    } else {
      // Jika password tidak cocok
      res.status(401).json({
        statusCode: 401,
        message: "Invalid password",
      });
    }
  } catch (error) {
    // Tangani error server
    console.error("Error in signin:", error);
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};
