import {
  createBookingService,
  getUserBookingsService,
  getUserBookingByIdService,
  cancelUserBookingService,
  getPriestAvailabilityService,
} from '../services/bookingService.js';

/**
 * @desc    Get priest time slot availability for a date
 * @route   GET /api/bookings/availability
 * @access  Private (Authenticated User)
 */
export const getAvailability = async (req, res, next) => {
  try {
    const { priestId, date } = req.query;

    if (!priestId) {
      return res.status(400).json({
        success: false,
        message: 'priestId query parameter is required',
      });
    }

    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'date query parameter is required (format: YYYY-MM-DD)',
      });
    }

    const result = await getPriestAvailabilityService(priestId, date);

    res.status(200).json({
      success: true,
      date: result.date,
      slots: result.slots,
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    next(error);
  }
};

/**
 * @desc    Create a new pooja booking
 * @route   POST /api/bookings
 * @access  Private (Authenticated User)
 */
export const createBooking = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Security: sanitize payload so client cannot inject user, status, poojaPrice, totalAmount, etc.
    const {
      poojaId,
      priestId,
      bookingDate,
      timeSlot,
      location,
      devoteeDetails,
    } = req.body;

    const booking = await createBookingService(userId, {
      poojaId,
      priestId,
      bookingDate,
      timeSlot,
      location,
      devoteeDetails,
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking,
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    next(error);
  }
};

/**
 * @desc    Get logged in user's bookings
 * @route   GET /api/bookings
 * @access  Private (Authenticated User)
 */
export const getMyBookings = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { bookings, pagination } = await getUserBookingsService(userId, req.query);

    res.status(200).json({
      success: true,
      data: bookings,
      pagination,
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    next(error);
  }
};

/**
 * @desc    Get booking details by ID
 * @route   GET /api/bookings/:id
 * @access  Private (Authenticated User)
 */
export const getBookingById = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const booking = await getUserBookingByIdService(userId, id);

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    next(error);
  }
};

/**
 * @desc    Cancel an eligible booking
 * @route   PATCH /api/bookings/:id/cancel
 * @access  Private (Authenticated User)
 */
export const cancelBooking = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const { cancellationReason } = req.body;

    const updatedBooking = await cancelUserBookingService(userId, id, cancellationReason);

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: updatedBooking,
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    next(error);
  }
};
