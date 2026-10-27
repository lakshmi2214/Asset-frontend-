/**
 * ImageUploadModal – React component
 * Renders a Bootstrap Modal for uploading an asset photo
 * when receiving or returning a booking.
 *
 * Props:
 *  show          {boolean}   – controls modal visibility
 *  onHide        {Function}  – called to close the modal
 *  onSubmit      {Function}  – called when "Submit & Receive/Return" is clicked
 *  uploadAction  {string|null} – 'receive' | 'return'
 *  selectedFile  {File|null} – currently selected file
 *  setSelectedFile {Function}
 */

import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function ImageUploadModal({
  show,
  onHide,
  onSubmit,
  uploadAction,
  selectedFile,
  setSelectedFile,
}) {
  const isReceive = uploadAction === 'receive';

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {isReceive ? 'Receive Asset - Upload Photo' : 'Return Asset - Upload Photo'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>
            Please upload a photo of the asset{' '}
            {isReceive ? 'before taking it' : 'after usage'}
          </Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmit} disabled={!selectedFile}>
          Submit &amp; {isReceive ? 'Receive' : 'Return'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
