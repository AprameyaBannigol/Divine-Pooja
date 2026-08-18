import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import healthRoutes from './routes/healthRoutes.js';
import poojaRoutes from './routes/poojaRoutes.js';
import priestRoutes from './routes/priestRoutes.js';
import muhurtaRoutes from './routes/muhurtaRoutes.js';
import templeRoutes from './routes/templeRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(helmet({
  crossOriginResourcePolicy: false,
}));

const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({
  origin: [clientUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// API Routes
app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api', poojaRoutes);
app.use('/api', priestRoutes);
app.use('/api', muhurtaRoutes);
app.use('/api', templeRoutes);
app.use('/api', blogRoutes);

// Error Handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
