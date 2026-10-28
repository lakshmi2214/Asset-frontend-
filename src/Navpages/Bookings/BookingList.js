import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Badge, Button, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import { authorizedFetch, getValidAccessToken, clearTokens, API_BASE } from '../../auth';
import ImageUploadModal from '../../Home/ImageUploadModal';

function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  return isNaN(date.getTime()) ? value : date.toLocaleString();
}

function formatStatusLabel(status) {
  if (!status) return 'Pending';
  if (status === 'cancellation_requested') return 'Cancellation Requested';
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function getStatusVariant(status) {
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

const CANCELLATION_OPTIONS = [
  'Changed my mind',
  'Found better alternative',
  'Schedule conflict',
  'Booking error',
  'Technical issue',
  'Other',
];

function BookingCard({
  booking: b,
  onReceive,
  onReturn,
  onCancel,
}) {
  const canCancel = !b.status || b.status === 'pending' || b.status === 'accepted';

  return (
    <Col xs={12} sm={12} md={6} lg={4}>
      <Card className="h-100 asset-card shadow-sm border-0">
        <div className="asset-img-container position-relative">
          <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}>
            <Badge bg="dark" className="bg-opacity-75 shadow-sm text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
              #{b.id}
            </Badge>
          </div>

          <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
            <Badge bg={getStatusVariant(b.status)} className="shadow-sm">
              {formatStatusLabel(b.status)}
            </Badge>
          </div>

          {b.asset && b.asset.image_url ? (
            <Card.Img
              variant="top"
              src={b.asset.image_url}
              alt={b.asset.name}
              className="asset-card-img"
            />
          ) : (
            <div className="asset-card-placeholder">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '48px', height: '48px' }}>
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
              <span className="small text-muted mt-1">No Image Available</span>
            </div>
          )}
        </div>

        <Card.Body className="asset-card-body d-flex flex-column p-3">
          <Card.Title className="asset-card-title fw-bold text-dark mb-1 fs-5">
            {(b.asset && b.asset.name) || 'Asset'}
          </Card.Title>

          {b.asset && b.asset.serial_number && (
            <div className="mb-2 text-muted small">
              S/N: <span className="font-monospace">{b.asset.serial_number}</span>
            </div>
          )}

          <div className="mt-2 mb-3 text-secondary small d-flex flex-column gap-1 bg-light p-2 rounded-3 border">
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-muted">Quantity:</span>
              <Badge bg="secondary" style={{ fontSize: '0.75rem' }}>
                {b.quantity || 1} Unit(s)
              </Badge>
            </div>

            <div className="d-flex justify-content-between">
              <span className="text-muted">Start Date:</span>
              <span className="fw-semibold text-dark">{formatDate(b.start_datetime)}</span>
            </div>

            <div className="d-flex justify-content-between">
              <span className="text-muted">Return Date:</span>
              <span className="fw-semibold text-dark">{formatDate(b.end_datetime)}</span>
            </div>

            {b.contact_name && (
              <div className="d-flex justify-content-between border-top pt-1 mt-1">
                <span className="text-muted">Reserved For:</span>
                <span className="text-dark">{b.contact_name}</span>
              </div>
            )}

            {b.purpose && (
              <div className="mt-1 text-muted fst-italic text-truncate" title={b.purpose}>
                "{b.purpose}"
              </div>
            )}

            {b.received_at && (
              <div className="mt-1 text-primary small border-top pt-1">
                <strong>Received:</strong> {formatDate(b.received_at)}
              </div>
            )}

            {b.returned_at && (
              <div className="text-success small">
                <strong>Returned:</strong> {formatDate(b.returned_at)}
              </div>
            )}
          </div>
        </Card.Body>

        <Card.Footer className="bg-white border-top-0 pt-0 pb-3 px-3 d-flex flex-column gap-2 mt-auto">
          {b.status === 'accepted' && (
            <Button
              variant="primary"
              size="sm"
              className="rounded-pill py-2 fw-semibold"
              onClick={() => onReceive(b.id)}
            >
              Receive Asset (Upload Photo)
            </Button>
          )}

          {b.status === 'received' && (
            <Button
              variant="success"
              size="sm"
              className="rounded-pill py-2 fw-semibold"
              onClick={() => onReturn(b.id)}
            >
              Return Asset (Upload Photo)
            </Button>
          )}

          {canCancel && (
            <Button
              variant="outline-danger"
              size="sm"
              className="rounded-pill py-1 fw-semibold"
              onClick={() => onCancel(b.id)}
            >
              Cancel Booking
            </Button>
          )}
        </Card.Footer>
      </Card>
    </Col>
  );
}

function CancelBookingModal({
  show,
  onHide,
  onConfirm,
  cancelReason,
  setCancelReason,
  otherReason,
  setOtherReason,
  isOther,
  setIsOther,
  options,
}) {
  function handleReasonChange(e) {
    if (e.target.value === 'Other') {
      setIsOther(true);
    } else {
      setIsOther(false);
      setCancelReason(e.target.value);
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cancel Booking</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="text-secondary small">Please select a reason for cancelling this reservation:</p>
        <Form>
          {options.map((option) => (
            <Form.Check
              key={option}
              type="radio"
              id={`reason-${option}`}
              label={option}
              name="cancelReason"
              value={option}
              checked={isOther ? option === 'Other' : cancelReason === option}
              onChange={handleReasonChange}
              className="mb-2"
            />
          ))}

          {isOther && (
            <Form.Group className="mt-3">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Please specify your reason..."
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
              />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={onHide}>
          Keep Booking
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Confirm Cancellation
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [showImageModal, setShowImageModal] = useState(false);
  const [uploadAction, setUploadAction] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [cancelReason, setCancelReason] = useState('Changed my mind');
  const [otherReason, setOtherReason] = useState('');
  const [isOther, setIsOther] = useState(false);

  const loadBookings = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    setError('');
    try {
      const token = await getValidAccessToken();
      if (!token) {
        setError('Please login again.');
        return;
      }

      // Add timestamp query parameter to prevent stale browser caching
      const response = await authorizedFetch(`${API_BASE}/api/v1/bookings/?_t=${Date.now()}`);

      if (!response.ok) {
        if (response.status === 401) {
          clearTokens();
          setError('Session expired. Please login again.');
          return;
        }
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const rawList = Array.isArray(data)
        ? data
        : Array.isArray(data?.results)
          ? data.results
          : [];

      // Sort by newest booking ID first
      const sorted = [...rawList].sort((a, b) => Number(b.id) - Number(a.id));
      setBookings(sorted);
    } catch (err) {
      console.error('Error loading bookings:', err);
      if (err.message === 'AUTH_REQUIRED') {
        clearTokens();
        setError('Session expired. Please login again.');
      } else {
        setError(`Failed to load bookings (${err.message || 'Network error'}). Please click Refresh to try again.`);
      }
    } finally {
      setLoading(false);
      if (isManualRefresh) setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

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
          headers: {},
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
        alert('Asset returned successfully!');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during upload.');
    }
  }

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

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      // Filter by status tab
      if (statusFilter !== 'all') {
        if (statusFilter === 'pending' && b.status !== 'pending') return false;
        if (statusFilter === 'accepted' && b.status !== 'accepted') return false;
        if (statusFilter === 'received' && b.status !== 'received') return false;
        if (statusFilter === 'returned' && b.status !== 'returned') return false;
        if (
          statusFilter === 'cancelled' &&
          b.status !== 'cancelled' &&
          b.status !== 'cancellation_requested' &&
          b.status !== 'rejected'
        ) {
          return false;
        }
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const assetName = b.asset?.name?.toLowerCase() || '';
        const purpose = b.purpose?.toLowerCase() || '';
        const contactName = b.contact_name?.toLowerCase() || '';
        const idStr = String(b.id);
        return (
          assetName.includes(q) ||
          purpose.includes(q) ||
          contactName.includes(q) ||
          idStr.includes(q)
        );
      }

      return true;
    });
  }, [bookings, statusFilter, searchQuery]);

  return (
    <div className="pb-5">
      {/* Hero Banner */}
      <div className="page-hero-banner">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <div className="page-hero-badge">✦ MY RESERVATIONS &amp; HISTORY</div>
            <h1 className="page-hero-title">Booking History</h1>
            <p className="page-hero-subtitle">
              View your reserved studio equipment, track active rentals, and manage your gear schedule.
            </p>
          </div>
          <div className="d-flex gap-2 align-items-center flex-wrap">
            <Button
              variant="light"
              className="rounded-pill px-4 py-2 border shadow-sm fw-semibold text-secondary d-flex align-items-center gap-2"
              onClick={() => loadBookings(true)}
              disabled={refreshing || loading}
            >
              {refreshing ? (
                <>
                  <Spinner animation="border" size="sm" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <span>⟳</span>
                  <span>Refresh</span>
                </>
              )}
            </Button>
            <Link to="/book-asset" className="btn-purple-pill py-2 px-4 text-white text-decoration-none">
              + Book More Gear
            </Link>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="catalog-filter-bar d-flex flex-wrap gap-3 align-items-center justify-content-between mb-4">
        <div className="d-flex flex-wrap gap-2 align-items-center">
          <Button
            variant="light"
            size="sm"
            className={`filter-btn ${statusFilter === 'all' ? 'filter-btn-active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            All Bookings ({bookings.length})
          </Button>
          <Button
            variant="light"
            size="sm"
            className={`filter-btn ${statusFilter === 'pending' ? 'filter-btn-active' : ''}`}
            onClick={() => setStatusFilter('pending')}
          >
            Pending ({bookings.filter((b) => b.status === 'pending').length})
          </Button>
          <Button
            variant="light"
            size="sm"
            className={`filter-btn ${statusFilter === 'accepted' ? 'filter-btn-active' : ''}`}
            onClick={() => setStatusFilter('accepted')}
          >
            Accepted ({bookings.filter((b) => b.status === 'accepted').length})
          </Button>
          <Button
            variant="light"
            size="sm"
            className={`filter-btn ${statusFilter === 'received' ? 'filter-btn-active' : ''}`}
            onClick={() => setStatusFilter('received')}
          >
            Received ({bookings.filter((b) => b.status === 'received').length})
          </Button>
          <Button
            variant="light"
            size="sm"
            className={`filter-btn ${statusFilter === 'returned' ? 'filter-btn-active' : ''}`}
            onClick={() => setStatusFilter('returned')}
          >
            Returned ({bookings.filter((b) => b.status === 'returned').length})
          </Button>
          <Button
            variant="light"
            size="sm"
            className={`filter-btn ${statusFilter === 'cancelled' ? 'filter-btn-active' : ''}`}
            onClick={() => setStatusFilter('cancelled')}
          >
            Cancelled ({bookings.filter((b) => ['cancelled', 'cancellation_requested', 'rejected'].includes(b.status)).length})
          </Button>
        </div>

        <div className="search-input-wrapper">
          <input
            type="text"
            className="form-control search-input-field"
            placeholder="Search by asset, ID, or purpose..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <div className="text-muted mt-3">Loading your bookings...</div>
        </div>
      )}

      {/* Error Alert */}
      {!loading && error && (
        <Alert variant="danger" className="d-flex justify-content-between align-items-center">
          <div>{error}</div>
          <Button variant="outline-danger" size="sm" onClick={() => loadBookings(true)}>
            Try Again
          </Button>
        </Alert>
      )}

      {/* Empty State */}
      {!loading && !error && bookings.length === 0 && (
        <div className="text-center py-5 my-4 bg-white rounded-4 border p-5 shadow-sm">
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>📦</div>
          <h4 className="fw-bold mb-2">No Bookings Found</h4>
          <p className="text-muted mb-4">
            You haven't made any equipment reservations yet. Browse our inventory to book cameras, lenses, and gear.
          </p>
          <Link to="/book-asset" className="btn-purple-pill py-2 px-4 text-decoration-none">
            Browse Equipment &amp; Book
          </Link>
        </div>
      )}

      {/* Filtered Empty State */}
      {!loading && !error && bookings.length > 0 && filteredBookings.length === 0 && (
        <div className="text-center py-5 my-4 bg-white rounded-4 border p-5 shadow-sm">
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
          <h5 className="fw-bold mb-2">No Matching Reservations</h5>
          <p className="text-muted mb-3">
            No bookings match your current filter or search criteria.
          </p>
          <Button
            variant="outline-primary"
            size="sm"
            className="rounded-pill px-3"
            onClick={() => {
              setStatusFilter('all');
              setSearchQuery('');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Bookings Grid */}
      {!loading && !error && filteredBookings.length > 0 && (
        <Row className="g-4">
          {filteredBookings.map((b) => (
            <BookingCard
              key={b.id}
              booking={b}
              onReceive={(id) => openImageModal(id, 'receive')}
              onReturn={(id) => openImageModal(id, 'return')}
              onCancel={openCancelModal}
            />
          ))}
        </Row>
      )}

      {/* Cancellation Modal */}
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

      {/* Image Upload Modal */}
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
