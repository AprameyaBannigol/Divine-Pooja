import express from 'express';
import { getPoojas, getPoojaById } from '../controllers/poojaController.js';

const router = express.Router();

router.get('/poojas', getPoojas);
router.get('/poojas/:id', getPoojaById);

export default router;
