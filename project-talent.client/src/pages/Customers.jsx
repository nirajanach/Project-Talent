// Customers.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import BASE_URL from "../constants/LocalStorageKeys";

function CustomerModal({ showModal, closeModal, setGetCustomer, editData }) {
  const [id, setId] = useState(editData?.id || "");
  const [name, setName] = useState(editData?.name || "");
  const [address, setAddress] = useState(editData?.address || "");

  const handleClose = () => closeModal();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = BASE_URL + "Customer";

    const data = editData ? { id, name, address } : { name, address };

    const response = editData
      ? await axios.put(`${url}/${id}`, data)
      : await axios.post(url, data);

    if (!editData) {
      setGetCustomer((prevCustomers) => [...prevCustomers, response.data]);
    }

    console.log("Record saved successfully");
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{editData ? "Edit" : "Create"} a Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="input"
              placeholder="Name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="input"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {editData ? "Update" : "Save"}
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function ConfirmationModal({ showConfirmation, handleConfirm, handleClose }) {
  return (
    <Modal show={showConfirmation} onHide={handleClose} centered>
      <Modal.Body>Are you sure you want to delete this record?</Modal.Body>
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

function Customers() {
  const [getCustomer, setGetCustomer] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteRecordId, setDeleteRecordId] = useState(null);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, [showModal]);

  const fetchCustomers = async () => {
    const response = await axios.get(BASE_URL + "Customer");
    setGetCustomer(response.data);
  };

  const handleShow = () => setShowModal(!showModal);

  const handleClose = () => {
    setShowModal(false);
    setEditData(null);
  };

  const handleEdit = (id) => {
    const dataToEdit = getCustomer.find((customer) => customer.id === id);
    setEditData(dataToEdit);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setDeleteRecordId(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    const url = `${BASE_URL}Customer/${deleteRecordId}`;
    await axios.delete(url);
    fetchCustomers();
    setShowConfirmation(false);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const Table = ({ columns, data }) => {
    const visibleColumns = columns.filter((column) => column !== "id");

    return (
      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              {visibleColumns.map((column, index) => (
                <th scope="col" key={index}>
                  {capitalizeFirstLetter(column)}
                </th>
              ))}
              <th scope="col">Actions</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {visibleColumns.map((column, index) => (
                  <td key={index}>{row[column]}</td>
                ))}
                <td scope="col">
                  <Button
                    className=""
                    variant="warning"
                    onClick={() => handleEdit(row.id)}
                  >
                    Edit
                  </Button>
                </td>
                <td scope="col">
                  <Button
                    className="align-center"
                    variant="danger"
                    onClick={() => handleDelete(row.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ConfirmationModal
          showConfirmation={showConfirmation}
          handleConfirm={handleConfirmDelete}
          handleClose={() => setShowConfirmation(false)}
        />
      </div>
    );
  };

  const columns = getCustomer.length > 0 ? Object.keys(getCustomer[0]) : [];

  return (
    <div className="container">
      <div className="btn-group">
        <Button className="mb-2 me-1" variant="primary" onClick={handleShow}>
          New Customer
        </Button>
        {showModal && (
          <CustomerModal
            showModal={showModal}
            closeModal={handleClose}
            setGetCustomer={setGetCustomer}
            editData={editData}
          />
        )}
      </div>
      <Table columns={columns} data={getCustomer} />
    </div>
  );
}

export default Customers;
