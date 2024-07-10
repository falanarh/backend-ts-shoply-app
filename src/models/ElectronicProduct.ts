import mongoose, { Document, Model } from "mongoose";
import Product from "./Product";

// Interface untuk dokumen produk elektronik
interface IElectronicProduct extends Document {
  warranty: number;
  cpu?: string;
  gpu?: string;
  storage?: string[];
  ram?: string[];
  battery?: string;
  os?: string;
  displaySize?: string;
  cameraResolution?: string;
  connectivity?: string;
}

// Define schemas for specific subcategories
const SmartphoneSchema = new mongoose.Schema({
  warranty: { type: Number, required: true },
  cpu: { type: String, required: true },
  gpu: { type: String, required: true },
  storage: { type: [String], required: true },
  ram: { type: [String], required: true },
  battery: { type: String, required: true },
  os: { type: String, required: true },
  displaySize: { type: String, required: true },
  cameraResolution: { type: String, required: true },
  connectivity: { type: String, required: true },
});

const LaptopSchema = new mongoose.Schema({
  warranty: {
    type: Number,
    required: true,
  },
  cpu: {
    type: String,
    required: true,
  },
  gpu: {
    type: String,
    required: true,
  },
  storage: {
    type: [String],
    required: true,
  },
  ram: {
    type: [String],
    required: true,
  },
  battery: {
    type: String,
    required: true,
  },
  os: {
    type: String,
    required: true,
  },
  displaySize: {
    type: String,
    required: true,
  },
  cameraResolution: {
    type: String,
    required: false,
  },
  connectivity: {
    type: String,
    required: true,
  },
});

// Define discriminators for specific subcategories
const Smartphone: Model<IElectronicProduct> =
  Product.discriminator<IElectronicProduct>("smartphone", SmartphoneSchema);

const Laptop: Model<IElectronicProduct> =
  Product.discriminator<IElectronicProduct>("laptop", LaptopSchema);

export { Smartphone, Laptop };