import express from 'express';
import { getPriests, getPriestById } from '../controllers/priestController.js';

const router = express.Router();

router.get('/priests', getPriests);
router.get('/priests/:id', getPriestById);

export default router;
