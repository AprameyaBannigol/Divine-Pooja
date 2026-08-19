import API from './api.js';

/**
 * Create a new pooja booking
 * @param {Object} bookingData
 */
export const createBooking = async (bookingData) => {
  const response = await API.post('/bookings', bookingData);
  return response.data;
};

/**
 * Retrieve authenticated user's bookings list
 * @param {Object} params
 */
export const getMyBookings = async (params = {}) => {
  const response = await API.get('/bookings', { params });
  return response.data;
};

/**
 * Retrieve specific booking details by ID
 * @param {string} id
 */
export const getBookingById = async (id) => {
  const response = await API.get(`/bookings/${id}`);
  return response.data;
};

/**
 * Fetch priest slot availability for a target date
 * @param {string} priestId
 * @param {string} date YYYY-MM-DD
 */
export const getAvailability = async (priestId, date) => {
  const response = await API.get('/bookings/availability', {
    params: { priestId, date },
  });
  return response.data;
};

/**
 * Cancel an eligible booking
 * @param {string} id
 * @param {string} cancellationReason
 */
export const cancelBooking = async (id, cancellationReason = '') => {
  const response = await API.patch(`/bookings/${id}/cancel`, { cancellationReason });
  return response.data;
};
