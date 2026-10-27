/**
 * BookingList – React page component
 *
 * Responsibilities:
 *  1. Fetch the current user's bookings from the API on mount.
 *  2. Manage modal state (cancel & image-upload).
 *  3. Handle "receive", "return", and "cancel" booking actions via API.
 *  4. Delegate rendering to BookingCard, CancelBookingModal, and ImageUploadModal.
 *
 * Stack: JavaScript (ES6+) · React · React-Bootstrap · CSS (index.css)
 */

import React, { useEffect, useState } from 'react';
import { Row, Alert } from 'react-bootstrap';
import { authorizedFetch, getValidAccessToken, clearTokens, API_BASE } from '../../auth';

// Sub-components
import BookingCard from './BookingCard';
import CancelBookingModal from './CancelBookingModal';
import ImageUploadModal from '../../Home/ImageUploadModal';

// Pure utility helpers & constants
import {
  formatDate,
  formatStatusLabel,
  getStatusVariant,
  CANCELLATION_OPTIONS,
} from './bookingUtils';

// ─────────────────────────────────────────────────────────────────────────────
export default function BookingList() {
  // ── Data state ──────────────────────────────────────────────────────────────
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ── Image-upload modal state ─────────────────────────────────────────────
  const [showImageModal, setShowImageModal] = useState(false);
  const [uploadAction, setUploadAction] = useState(null); // 'receive' | 'return'
  const [selectedFile, setSelectedFile] = useState(null);

  // ── Cancel modal state ───────────────────────────────────────────────────
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [cancelReason, setCancelReason] = useState('Changed my mind');
  const [otherReason, setOtherReason] = useState('');
  const [isOther, setIsOther] = useState(false);

  // ── Fetch bookings on mount ──────────────────────────────────────────────
  useEffect(() => {
    let active = true;

    async function loadBookings() {
      setError('');
      try {
        const token = await getValidAccessToken();
        if (!token) {
          if (active) setError('Please login again.');
          return;
        }

        const response = await authorizedFetch(`${API_BASE}/api/v1/bookings/`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          if (response.status === 401) {
            clearTokens();
            if (active) setError('Session expired. Please login again.');
            return;
          }
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        if (active) {
          const normalized = Array.isArray(data)
            ? data
            : Array.isArray(data?.results)
              ? data.results
              : [];
          setBookings(normalized);
        }
      } catch (err) {
        console.error('Error loading bookings:', err);
        if (active) {
          if (err.message === 'AUTH_REQUIRED') {
            clearTokens();
            setError('Session expired. Please login again.');
          } else {
            setError('Failed to load bookings. Please try again.');
          }
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadBookings();
    return () => { active = false; };
  }, []);

  // ── Modal openers ────────────────────────────────────────────────────────
  function openCancelModal(id) {
    setSelectedBookingId(id);
    setCancelReason('Changed my mind');
    setOtherReason('');
    setIsOther(false);
    setShowCancelModal(true);
  }

  function openImageModal(id, action) {
    setSelectedBookingId(id);
    setUploadAction(action);
    setSelectedFile(null);
    setShowImageModal(true);
  }

  // ── API action: receive / return asset ───────────────────────────────────
  async function handleImageSubmit() {
    if (!selectedBookingId || !selectedFile || !uploadAction) return;

    const endpoint = uploadAction === 'receive' ? 'receive' : 'return_asset';
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await authorizedFetch(
        `${API_BASE}/api/v1/bookings/${selectedBookingId}/${endpoint}/`,
        {
          method: 'POST',
          body: formData,
          headers: {}, // Let browser set Content-Type + boundary automatically
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        alert(`Error: ${errData.detail || 'Action failed'}`);
        return;
      }

      const updatedBooking = await response.json();
      setBookings((current) =>
        current.map((b) => (b.id === selectedBookingId ? updatedBooking : b))
      );
      setShowImageModal(false);

      if (uploadAction === 'return') {
        alert('Asset returned successfully. Logging out...');
        clearTokens();
        window.location.href = '/login';
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during upload.');
    }
  }

  // ── API action: cancel booking ───────────────────────────────────────────
  async function confirmCancel() {
    if (!selectedBookingId) return;

    const finalReason = isOther ? otherReason : cancelReason;
    if (isOther && !otherReason.trim()) {
      alert('Please provide a reason for cancellation.');
      return;
    }

    try {
      const res = await authorizedFetch(
        `${API_BASE}/api/v1/bookings/${selectedBookingId}/cancel/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reason: finalReason }),
        }
      );

      if (!res.ok) {
        if (res.status === 401) {
          clearTokens();
          alert('Session expired. Please login again.');
          return;
        }
        alert('Cancel failed: ' + res.status);
        setShowCancelModal(false);
        return;
      }

      const data = await res.json();
      setBookings((current) =>
        current.map((b) =>
          b.id === selectedBookingId
            ? { ...b, status: data.status || 'cancellation_requested' }
            : b
        )
      );
      setShowCancelModal(false);
    } catch (err) {
      if (err.message === 'AUTH_REQUIRED') {
        clearTokens();
        alert('Session expired. Please login again.');
      } else {
        alert('Error: ' + err.message);
      }
      setShowCancelModal(false);
    }
  }

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div>
      <h2>My Bookings</h2>

      {/* Loading state */}
      {loading && (
        <div style={{ padding: '40px 0', textAlign: 'center' }}>Loading...</div>
      )}

      {/* Error state */}
      {!loading && error && <Alert variant="danger">{error}</Alert>}

      {/* Empty state */}
      {!loading && !error && bookings.length === 0 && (
        <Alert variant="info">You have no bookings yet.</Alert>
      )}

      {/* Booking cards grid */}
      {!loading && !error && bookings.length > 0 && (
        <Row className="g-3">
          {bookings.map((b) => (
            <BookingCard
              key={b.id}
              booking={b}
              onReceive={(id) => openImageModal(id, 'receive')}
              onReturn={(id) => openImageModal(id, 'return')}
              onCancel={openCancelModal}
              formatDate={formatDate}
              formatStatusLabel={formatStatusLabel}
              getStatusVariant={getStatusVariant}
            />
          ))}
        </Row>
      )}

      {/* Cancel Booking Modal */}
      <CancelBookingModal
        show={showCancelModal}
        onHide={() => setShowCancelModal(false)}
        onConfirm={confirmCancel}
        cancelReason={cancelReason}
        setCancelReason={setCancelReason}
        otherReason={otherReason}
        setOtherReason={setOtherReason}
        isOther={isOther}
        setIsOther={setIsOther}
        options={CANCELLATION_OPTIONS}
      />

      {/* Image Upload Modal (receive / return) */}
      <ImageUploadModal
        show={showImageModal}
        onHide={() => setShowImageModal(false)}
        onSubmit={handleImageSubmit}
        uploadAction={uploadAction}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
      />
    </div>
  );
}
