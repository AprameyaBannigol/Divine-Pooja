import mongoose from 'mongoose';
import Booking from '../models/Booking.js';
import Pooja from '../models/Pooja.js';
import Priest from '../models/Priest.js';
import { ALLOWED_TIME_SLOTS, isValidTimeSlot, normalizeBookingDate, formatDateString } from '../utils/timeSlots.js';

/**
 * Service to get priest availability for a target date
 */
export const getPriestAvailabilityService = async (priestId, dateInput) => {
  if (!mongoose.Types.ObjectId.isValid(priestId)) {
    const error = new Error('Invalid priest ID format');
    error.statusCode = 400;
    throw error;
  }

  const priest = await Priest.findById(priestId);
  if (!priest || !priest.isActive || priest.verificationStatus !== 'APPROVED') {
    const error = new Error('Priest profile not found or unavailable');
    error.statusCode = 404;
    throw error;
  }

  const normalizedDate = normalizeBookingDate(dateInput);
  if (!normalizedDate) {
    const error = new Error('Invalid or missing date parameter');
    error.statusCode = 400;
    throw error;
  }

  // Find all active (PENDING, CONFIRMED) bookings for this priest and date
  const activeBookings = await Booking.find({
    priest: priestId,
    bookingDate: normalizedDate,
    status: { $in: ['PENDING', 'CONFIRMED'] },
  }).select('timeSlot.startTime');

  const occupiedStartTimes = new Set(activeBookings.map((b) => b.timeSlot.startTime));

  const slots = ALLOWED_TIME_SLOTS.map((slot) => ({
    startTime: slot.startTime,
    endTime: slot.endTime,
    available: !occupiedStartTimes.has(slot.startTime),
  }));

  return {
    date: formatDateString(normalizedDate),
    slots,
  };
};

/**
 * Service to create a new booking
 */
export const createBookingService = async (userId, payload) => {
  const {
    poojaId,
    priestId,
    bookingDate,
    timeSlot,
    location,
    devoteeDetails,
  } = payload;

  // 1. Validate required fields
  if (!poojaId || !priestId || !bookingDate || !timeSlot || !location || !devoteeDetails) {
    const error = new Error('Missing required booking fields (poojaId, priestId, bookingDate, timeSlot, location, devoteeDetails)');
    error.statusCode = 400;
    throw error;
  }

  if (!mongoose.Types.ObjectId.isValid(poojaId)) {
    const error = new Error('Invalid pooja ID format');
    error.statusCode = 400;
    throw error;
  }

  if (!mongoose.Types.ObjectId.isValid(priestId)) {
    const error = new Error('Invalid priest ID format');
    error.statusCode = 400;
    throw error;
  }

  // 2. Validate Pooja
  const pooja = await Pooja.findById(poojaId);
  if (!pooja || !pooja.isActive) {
    const error = new Error('Selected pooja is invalid or currently inactive');
    error.statusCode = 400;
    throw error;
  }

  // 3. Validate Priest
  const priest = await Priest.findById(priestId);
  if (!priest || !priest.isActive || priest.verificationStatus !== 'APPROVED') {
    const error = new Error('Selected priest is unavailable or unapproved');
    error.statusCode = 400;
    throw error;
  }

  // 4. Validate Booking Date (Must be in the future)
  const normalizedDate = normalizeBookingDate(bookingDate);
  if (!normalizedDate) {
    const error = new Error('Invalid booking date provided');
    error.statusCode = 400;
    throw error;
  }

  const todayNormalized = normalizeBookingDate(new Date());
  if (normalizedDate < todayNormalized) {
    const error = new Error('Booking date must be a future date');
    error.statusCode = 400;
    throw error;
  }

  // 5. Validate Time Slot
  const { startTime, endTime } = timeSlot || {};
  if (!isValidTimeSlot(startTime, endTime)) {
    const error = new Error(`Invalid time slot selected. Allowed slots: ${ALLOWED_TIME_SLOTS.map((s) => `${s.startTime}-${s.endTime}`).join(', ')}`);
    error.statusCode = 400;
    throw error;
  }

  // 6. Validate Location Fields
  const { type = 'HOME', address, city, state, pincode } = location || {};
  if (!address || !address.trim() || !city || !city.trim() || !state || !state.trim() || !pincode || !pincode.trim()) {
    const error = new Error('Complete location address, city, state, and pincode are required');
    error.statusCode = 400;
    throw error;
  }

  // 7. Validate Devotee Details
  const { name: devoteeName, phone: devoteePhone, gotra, specialInstructions } = devoteeDetails || {};
  if (!devoteeName || !devoteeName.trim() || !devoteePhone || !devoteePhone.trim()) {
    const error = new Error('Devotee name and contact phone number are required');
    error.statusCode = 400;
    throw error;
  }

  // 8. Calculate snapshot pricing (Server-side single source of truth)
  const poojaPrice = Number(pooja.price);
  const additionalCharges = 0; // MVP baseline, extensible for add-on services
  const totalAmount = poojaPrice + additionalCharges;

  // 9. Pre-check availability
  const existingBooking = await Booking.findOne({
    priest: priestId,
    bookingDate: normalizedDate,
    'timeSlot.startTime': startTime,
    status: { $in: ['PENDING', 'CONFIRMED'] },
  });

  if (existingBooking) {
    const error = new Error('This time slot is no longer available for the selected priest');
    error.statusCode = 409;
    throw error;
  }

  // 10. Create Booking atomically (MongoDB partial index handles concurrent race conditions)
  try {
    const booking = await Booking.create({
      user: userId,
      pooja: poojaId,
      priest: priestId,
      bookingDate: normalizedDate,
      timeSlot: {
        startTime: startTime.trim(),
        endTime: endTime.trim(),
      },
      location: {
        type: type === 'TEMPLE' ? 'TEMPLE' : 'HOME',
        address: address.trim(),
        city: city.trim(),
        state: state.trim(),
        pincode: pincode.trim(),
      },
      devoteeDetails: {
        name: devoteeName.trim(),
        phone: devoteePhone.trim(),
        gotra: gotra ? gotra.trim() : '',
        specialInstructions: specialInstructions ? specialInstructions.trim() : '',
      },
      pricing: {
        poojaPrice,
        additionalCharges,
        totalAmount,
      },
      status: 'PENDING',
    });

    // Populate public fields for response
    await booking.populate([
      { path: 'pooja', select: 'name slug duration price image' },
      { path: 'priest', select: 'name photo city rating experience' },
      { path: 'user', select: 'name email phone' },
    ]);

    return booking;
  } catch (err) {
    if (err.code === 11000) {
      const conflictErr = new Error('This time slot has just been booked by another user. Please select another slot.');
      conflictErr.statusCode = 409;
      throw conflictErr;
    }
    throw err;
  }
};

/**
 * Service to retrieve logged in user's bookings with pagination
 */
export const getUserBookingsService = async (userId, queryParams = {}) => {
  const { page = 1, limit = 10 } = queryParams;

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 10));
  const skip = (pageNum - 1) * limitNum;

  const query = { user: userId };

  const [bookings, total] = await Promise.all([
    Booking.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .populate('pooja', 'name slug duration price image')
      .populate('priest', 'name photo city rating experience'),
    Booking.countDocuments(query),
  ]);

  const pages = Math.ceil(total / limitNum) || 1;

  return {
    bookings,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      pages,
    },
  };
};

/**
 * Service to retrieve a specific user booking by ID with strict ownership validation
 */
export const getUserBookingByIdService = async (userId, bookingId) => {
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    const error = new Error('Booking not found');
    error.statusCode = 404;
    throw error;
  }

  const booking = await Booking.findById(bookingId)
    .populate('pooja', 'name slug duration price image')
    .populate('priest', 'name photo city rating experience')
    .populate('user', 'name email phone');

  // Enforce strict ownership: return 404 if booking does not exist or belongs to another user
  if (!booking || booking.user._id.toString() !== userId.toString()) {
    const error = new Error('Booking not found');
    error.statusCode = 404;
    throw error;
  }

  return booking;
};

/**
 * Service to cancel a user's booking
 */
export const cancelUserBookingService = async (userId, bookingId, cancellationReason) => {
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    const error = new Error('Booking not found');
    error.statusCode = 404;
    throw error;
  }

  const booking = await Booking.findById(bookingId);

  // Enforce strict ownership
  if (!booking || booking.user.toString() !== userId.toString()) {
    const error = new Error('Booking not found');
    error.statusCode = 404;
    throw error;
  }

  // Check eligibility for cancellation (only PENDING or CONFIRMED allowed)
  if (booking.status !== 'PENDING' && booking.status !== 'CONFIRMED') {
    const error = new Error(`Cannot cancel booking with current status '${booking.status}'`);
    error.statusCode = 400;
    throw error;
  }

  booking.status = 'CANCELLED';
  booking.cancelledAt = new Date();
  booking.cancellationReason = cancellationReason ? cancellationReason.trim() : 'Cancelled by user';

  await booking.save();

  await booking.populate([
    { path: 'pooja', select: 'name slug duration price image' },
    { path: 'priest', select: 'name photo city rating experience' },
  ]);

  return booking;
};
