import express from 'express';
import { getMuhurtas, getMuhurtaById } from '../controllers/muhurtaController.js';

const router = express.Router();

router.get('/muhurta', getMuhurtas);
router.get('/muhurta/:id', getMuhurtaById);

export default router;
