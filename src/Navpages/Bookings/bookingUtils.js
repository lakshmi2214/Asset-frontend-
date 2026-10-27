/**
 * Utility functions for the Booking module.
 * JavaScript (ES6+) – shared helper logic
 */

/**
 * Format an ISO date string to a readable locale string.
 * @param {string|null} value
 * @returns {string}
 */
export function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  return isNaN(date.getTime()) ? value : date.toLocaleString();
}

/**
 * Return a human-readable label for a booking status.
 * @param {string|null} status
 * @returns {string}
 */
export function formatStatusLabel(status) {
  if (!status) return 'Pending';
  if (status === 'cancellation_requested') return 'Cancellation Requested';
  return status.charAt(0).toUpperCase() + status.slice(1);
}

/**
 * Map a booking status to a Bootstrap Badge variant.
 * @param {string} status
 * @returns {string}
 */
export function getStatusVariant(status) {
  const map = {
    accepted: 'success',
    received: 'primary',
    returned: 'secondary',
    pending: 'warning',
    rejected: 'danger',
    cancelled: 'dark',
    cancellation_requested: 'info',
  };
  return map[status] ?? 'secondary';
}

/**
 * Cancellation reason options shown in the Cancel Booking modal.
 * @type {string[]}
 */
export const CANCELLATION_OPTIONS = [
  'Changed my mind',
  'Found better alternative',
  'Schedule conflict',
  'Booking error',
  'Technical issue',
  'Other',
];
