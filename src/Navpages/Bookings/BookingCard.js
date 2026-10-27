/**
 * BookingCard – React component
 * Renders a single booking as a Bootstrap Card with:
 *  - asset image with an overlay status badge
 *  - booking details (quantity, start/end dates, purpose, received/returned timestamps)
 *  - action buttons (Receive, Return, Cancel)
 *
 * Props:
 *  booking           {Object}   – booking data object
 *  onReceive         {Function} – called with (bookingId) when "Receive Asset" is clicked
 *  onReturn          {Function} – called with (bookingId) when "Return Asset" is clicked
 *  onCancel          {Function} – called with (bookingId) when "Cancel Booking" is clicked
 *  formatDate        {Function} – formats an ISO date string
 *  formatStatusLabel {Function} – returns human-readable status
 *  getStatusVariant  {Function} – returns Bootstrap variant for a status
 */

import React from 'react';
import { Card, Col, Badge, Button } from 'react-bootstrap';

export default function BookingCard({
  booking: b,
  onReceive,
  onReturn,
  onCancel,
  formatDate,
  formatStatusLabel,
  getStatusVariant,
}) {
  const canCancel = !b.status || b.status === 'pending' || b.status === 'accepted';

  return (
    <Col xs={12} sm={12} md={6} lg={4}>
      <Card className="h-100 asset-card">
        {/* --- Image area with status badge overlay --- */}
        <div className="asset-img-container">
          {b.asset && b.asset.image_url ? (
            <Card.Img
              variant="top"
              src={b.asset.image_url}
              alt={b.asset.name}
              className="asset-card-img"
            />
          ) : (
            <div
              style={{
                height: '100%',
                backgroundColor: '#f1f3f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: '#adb5bd' }}>No Image</span>
            </div>
          )}

          {/* Status badge overlaid on image */}
          <div style={{ position: 'absolute', top: 10, right: 10 }}>
            <Badge bg={getStatusVariant(b.status)} className="shadow-sm">
              {formatStatusLabel(b.status)}
            </Badge>
          </div>
        </div>

        {/* --- Card body: title + details --- */}
        <Card.Body className="asset-card-body">
          <Card.Title className="asset-card-title">
            {(b.asset && b.asset.name) || 'Asset'}
          </Card.Title>

          {b.asset && b.asset.serial_number && (
            <div className="mb-2 text-muted small">
              Serial: {b.asset.serial_number}
            </div>
          )}

          <div className="mb-3 text-secondary" style={{ fontSize: '0.9rem' }}>
            {/* Quantity row */}
            <div className="d-flex justify-content-between">
              <span><strong>Quantity:</strong></span>
              <span>
                <Badge bg="info" text="dark" style={{ fontSize: '0.75rem' }}>
                  {b.quantity || 1} Unit(s)
                </Badge>
              </span>
            </div>

            {/* Start date row */}
            <div className="d-flex justify-content-between">
              <span><strong>Start:</strong></span>
              <span>{formatDate(b.start_datetime)}</span>
            </div>

            {/* End date row */}
            <div className="d-flex justify-content-between">
              <span><strong>End:</strong></span>
              <span>{formatDate(b.end_datetime)}</span>
            </div>

            {/* Purpose (italic) */}
            {b.purpose && (
              <div className="mt-2 text-muted small fst-italic">
                "{b.purpose}"
              </div>
            )}

            {/* Received timestamp */}
            {b.received_at && (
              <div className="mt-2 text-primary small border-top pt-2">
                <i className="bi bi-box-seam me-1"></i>{' '}
                <strong>Received:</strong> {formatDate(b.received_at)}
              </div>
            )}

            {/* Returned timestamp */}
            {b.returned_at && (
              <div className="text-success small">
                <i className="bi bi-check-circle me-1"></i>{' '}
                <strong>Returned:</strong> {formatDate(b.returned_at)}
              </div>
            )}
          </div>
        </Card.Body>

        {/* --- Card footer: action buttons --- */}
        <Card.Footer className="bg-white border-top-0 pt-0 pb-3 px-3 d-flex flex-column gap-2">
          {b.status === 'accepted' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onReceive(b.id)}
            >
              Receive Asset (Upload Photo)
            </Button>
          )}

          {b.status === 'received' && (
            <Button
              variant="success"
              size="sm"
              onClick={() => onReturn(b.id)}
            >
              Return Asset (Upload Photo)
            </Button>
          )}

          {canCancel && (
            <Button
              variant="outline-danger"
              size="sm"
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
