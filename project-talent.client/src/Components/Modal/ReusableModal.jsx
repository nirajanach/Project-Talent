// ReusableModal.js
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function ReusableModal({
  showModal,
  closeModal,
  handleSubmit,
  editData,
  title,
  formFields,
}) {
  const [formData, setFormData] = useState(editData || {});

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <Modal show={showModal} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e, formData)}>
          {formFields.map((field) => (
            <Form.Group key={field.id} className="mb-3" controlId={field.id}>
              <Form.Label>{field.label}</Form.Label>
              <Form.Control
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.id] || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
              />
            </Form.Group>
          ))}
          <Button variant="primary" type="submit">
            {editData ? "Update" : "Save"}
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReusableModal;
