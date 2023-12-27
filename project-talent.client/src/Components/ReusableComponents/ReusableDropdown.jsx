import React from "react";
import { Form } from "react-bootstrap";

function ReusableDropdown({ label, options, selectedValue, onSelectChange }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="select"
        defaultValue={"Select One"}
        value={selectedValue || ""}
        onChange={(e) => onSelectChange(e.target.value)}
      >
        <option value="" disabled>
          Select One
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}

export default ReusableDropdown;
