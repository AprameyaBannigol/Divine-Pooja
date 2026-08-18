import express from 'express';
import { getTemples, getTempleById } from '../controllers/templeController.js';

const router = express.Router();

router.get('/temples', getTemples);
router.get('/temples/:id', getTempleById);

export default router;
