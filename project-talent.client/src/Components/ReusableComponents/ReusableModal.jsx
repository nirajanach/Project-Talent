// ReusableModal.js
import React, { useState, useRef } from "react";
import { Modal, Button, Form, ButtonGroup } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import ReusableDropdown from "./ReusableDropdown";

function ReusableModal({
  showModal,
  closeModal,
  handleSubmit,
  editData,
  title,
  formFields,
}) {
  const [formData, setFormData] = useState(editData || {});
  const formRef = useRef(null);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  {console.log("formData from reusablemodal : " + JSON.stringify(formData));}

  const renderFormField = (field) => {
    switch (field.type) {
      case "dropdown":
        return (
          <ReusableDropdown
            key={field.id}
            label={field.label}
            options={field.options}
            selectedValue={formData[field.id] || ""}
            onSelectChange={(value) => handleChange(field.id, value)}
          />
        );
      case "date":
        return (
          <Form.Group key={field.id} className="mb-3" controlId={field.id}>
            <Form.Label>{field.label}</Form.Label>
            <Form.Control
              type="date"
              value={formData[field.id] || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
            />
          </Form.Group>
        );
      default:
        return (
          <Form.Group key={field.id} className="mb-3" controlId={field.id}>
            <Form.Label>{field.label}</Form.Label>
            <Form.Control
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.id] || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
            />
          </Form.Group>
        );
    }
  };

  return (
    <Modal show={showModal} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          id="myForm"
          ref={formRef}
          onSubmit={(e) => handleSubmit(e, formData)}
        >
          {formFields.map((field) => renderFormField(field))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={closeModal}>
          Cancel
        </Button>
        <ButtonGroup variant="success" form="myForm" type="submit">
          <Button variant="success" form="myForm" type="submit">
            {editData ? "Edit" : "Create"}
          </Button>
          <Button
            variant="success"
            style={{ backgroundColor: "darkgreen" }}
            form="myForm"
            type="submit"
          >
            <FaCheck />
          </Button>
        </ButtonGroup>
      </Modal.Footer>
    </Modal>

    
  );
}

export default ReusableModal;

