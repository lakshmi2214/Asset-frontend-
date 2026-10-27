/**
 * CancelBookingModal – React component
 * Renders a Bootstrap Modal for selecting a cancellation reason.
 *
 * Props:
 *  show          {boolean}   – controls modal visibility
 *  onHide        {Function}  – called to close the modal
 *  onConfirm     {Function}  – called when "Confirm Cancellation" is clicked
 *  cancelReason  {string}    – currently selected preset reason
 *  setCancelReason {Function}
 *  otherReason   {string}    – free-text reason value
 *  setOtherReason {Function}
 *  isOther       {boolean}   – true when "Other" option is selected
 *  setIsOther    {Function}
 *  options       {string[]}  – list of cancellation reason strings
 */

import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function CancelBookingModal({
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
        <p>Please select a reason for cancellation:</p>
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
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Confirm Cancellation
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
