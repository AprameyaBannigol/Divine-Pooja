/**
 * Time Slot Configuration and Helper Utilities for Booking Engine
 */

export const ALLOWED_TIME_SLOTS = [
  { startTime: '06:00', endTime: '08:00' },
  { startTime: '08:00', endTime: '10:00' },
  { startTime: '10:00', endTime: '12:00' },
  { startTime: '12:00', endTime: '14:00' },
  { startTime: '14:00', endTime: '16:00' },
  { startTime: '16:00', endTime: '18:00' },
  { startTime: '18:00', endTime: '20:00' },
];

/**
 * Check if the given startTime and endTime match a valid allowed time slot.
 * @param {string} startTime e.g. "06:00"
 * @param {string} endTime e.g. "08:00"
 * @returns {boolean}
 */
export const isValidTimeSlot = (startTime, endTime) => {
  if (!startTime || !endTime) return false;
  return ALLOWED_TIME_SLOTS.some(
    (slot) => slot.startTime === startTime.trim() && slot.endTime === endTime.trim()
  );
};

/**
 * Format and normalize a date string or object to UTC/midnight normalized Date object.
 * @param {string|Date} dateInput
 * @returns {Date|null}
 */
export const normalizeBookingDate = (dateInput) => {
  if (!dateInput) return null;
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return null;
  // Normalize to UTC YYYY-MM-DD start of day for clean date indexing
  const formatted = d.toISOString().split('T')[0];
  return new Date(`${formatted}T00:00:00.000Z`);
};

/**
 * Get YYYY-MM-DD string representation of a date.
 * @param {Date} dateObj
 * @returns {string}
 */
export const formatDateString = (dateObj) => {
  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) return '';
  return dateObj.toISOString().split('T')[0];
};
