import express from 'express';
import { addElectronicProduct, deleteElectronicProduct, getAllElectronicProducts, getElectronicProductById, updateElectronicProduct } from '../controllers/electronicProductController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

// Endpoint untuk menambahkan produk elektronik baru
router.post('/', authenticateToken, addElectronicProduct);

// Endpoint untuk mendapatkan semua produk elektronik
router.get('/', authenticateToken, getAllElectronicProducts);

// Endpoint untuk mendapatkan detail produk elektronik berdasarkan ID dan sub-kategori
router.get('/:subCategory/:id', authenticateToken, getElectronicProductById);

// Endpoint untuk memperbarui produk elektronik berdasarkan ID dan sub-kategori
router.put('/:subCategory/:id', authenticateToken, updateElectronicProduct);

// Endpoint untuk menghapus produk elektronik berdasarkan ID dan sub-kategori
router.delete('/:subCategory/:id', authenticateToken, deleteElectronicProduct);

export default router;