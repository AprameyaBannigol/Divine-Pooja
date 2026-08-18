import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/healthRoutes.js';
import poojaRoutes from './routes/poojaRoutes.js';
import priestRoutes from './routes/priestRoutes.js';
import muhurtaRoutes from './routes/muhurtaRoutes.js';
import templeRoutes from './routes/templeRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

const app = express();

const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({
  origin: [clientUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}));

app.use(express.json());

// API Routes
app.use('/api', healthRoutes);
app.use('/api', poojaRoutes);
app.use('/api', priestRoutes);
app.use('/api', muhurtaRoutes);
app.use('/api', templeRoutes);
app.use('/api', blogRoutes);

// Error Handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
