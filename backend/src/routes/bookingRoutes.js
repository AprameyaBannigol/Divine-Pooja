import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getAvailability,
} from '../controllers/bookingController.js';

const router = express.Router();

// All booking endpoints require user authentication
router.use(protect);

router.get('/availability', getAvailability);
router.get('/', getMyBookings);
router.post('/', createBooking);
router.get('/:id', getBookingById);
router.patch('/:id/cancel', cancelBooking);

export default router;
