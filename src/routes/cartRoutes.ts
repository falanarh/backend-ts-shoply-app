import express from 'express';
import { addItemToCart, removeItemFromCart, getCart, updateItemInCart } from '../controllers/cartController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

// Endpoint untuk menambahkan item ke keranjang
router.post('/', authenticateToken, addItemToCart);

// Endpoint untuk menghapus item dari keranjang
router.delete('/', authenticateToken, removeItemFromCart);

// Endpoint untuk mengubah size dari item dalam keranjang
router.put('/', authenticateToken, updateItemInCart);

// Endpoint untuk mendapatkan semua item dalam keranjang
router.get('/:userId', authenticateToken, getCart);

export default router;