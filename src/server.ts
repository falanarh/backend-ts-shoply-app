import express from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import fashionRoutes from './routes/fashionProductRoutes';
import electronicRoutes from './routes/electronicProductRoutes';
import cartRoutes from './routes/cartRoutes';
import morgan from 'morgan';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(morgan('dev')); 

app.use('/api/auth', authRoutes);
app.use('/api/fashion', fashionRoutes);
app.use('/api/electronic', electronicRoutes);
app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));