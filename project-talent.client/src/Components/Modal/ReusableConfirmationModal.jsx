// ReusableConfirmationModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";

function ReusableConfirmationModal({
  showConfirmation,
  handleConfirm,
  handleClose,
  message,
}) {
  return (
    <Modal show={showConfirmation} onHide={handleClose} centered>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleConfirm}>
          Delete
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReusableConfirmationModal;
