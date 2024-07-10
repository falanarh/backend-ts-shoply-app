import express from 'express';
import { addFashionProduct, deleteFashionProduct, getAllFashionProducts, getFashionProductById, updateFashionProduct } from '../controllers/fashionProductController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

// Endpoint untuk menambahkan produk fashion baru
router.post('/', authenticateToken, addFashionProduct);

// Endpoint untuk mendapatkan semua produk fashion
router.get('/', authenticateToken, getAllFashionProducts);

// Endpoint untuk mendapatkan detail produk fashion berdasarkan ID
router.get('/:fashionType/:id', authenticateToken, getFashionProductById);

// Endpoint untuk memperbarui produk fashion berdasarkan ID
router.put('/:fashionType/:id', authenticateToken, updateFashionProduct);

// Endpoint untuk menghapus produk fashion berdasarkan ID
router.delete('/:fashionType/:id', authenticateToken, deleteFashionProduct);

export default router;