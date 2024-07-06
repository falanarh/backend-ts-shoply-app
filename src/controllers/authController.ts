import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const generateToken = (id: string) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign({ id }, secret, {
    expiresIn: "30d",
  });
};

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        statusCode: 400,
        message: "User already exists",
      });
    }

    const user = await User.create({ username, email, password });

    res.status(201).json({
      statusCode: 201,
      message: "User created successfully",
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id as string),
      },
    });
  } catch (error) {
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

    if (user && (await user.matchPassword(password))) {
      res.json({
        statusCode: 200,
        message: "Logged in successfully",
        data: {
          _id: user._id,
          username: user.username,
          email: user.email,
          token: generateToken(user._id as string),
        },
      });
    } else {
      res.status(401).json({
        statusCode: 401,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};
