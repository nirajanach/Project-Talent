// ReusableConfirmationModal.js
import React from "react";
import { Modal, Button, ButtonGroup } from "react-bootstrap";
import { ImCross } from "react-icons/im";

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
        <Button variant="dark" onClick={handleClose}>
          Cancel
        </Button>
        <ButtonGroup variant="danger">
          <Button variant="danger" onClick={handleConfirm}>
            Delete
          </Button>
          <Button
            variant="danger"
            style={{ backgroundColor: "darkred" }}
            onClick={handleConfirm}
          >
            <ImCross />
          </Button>
        </ButtonGroup>
      </Modal.Footer>
    </Modal>
  );
}

export default ReusableConfirmationModal;
