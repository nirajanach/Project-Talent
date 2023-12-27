// Customers.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import BASE_URL from "../constants/LocalStorageKeys";
import ReusableModal from "../Components/ReusableComponents/ReusableModal";
import ReusableTable from "../Components/ReusableComponents/ReusableTable";
import ReusableConfirmationModal from "../Components/ReusableComponents/ReusableConfirmationModal";


function Customers() {
  const [getCustomer, setGetCustomer] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteRecordId, setDeleteRecordId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState(
    "Are you sure ?"
  );

  const customerColumns = [
    { id: "name", label: "Name" },
    { id: "address", label: "Address" },
  ];



  const [modalFields, setModalFields] = useState(customerColumns);

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

  const handleModalSubmit = async (event, formData) => {
    event.preventDefault();
    const url = BASE_URL + "Customer";
    const data = editData ? { ...formData, id: editData.id } : formData;

    const response = editData
      ? await axios.put(`${url}/${editData.id}`, data)
      : await axios.post(url, data);

    if (!editData) {
      setGetCustomer((prevCustomers) => [...prevCustomers, response.data]);
    }

    console.log("Record saved successfully");
    handleClose();
  };

  // ... (existing code)

  return (
    <div className="container">
      <div className="btn-group">
        <Button className="mb-2 me-1" variant="primary" onClick={handleShow}>
          New Customer
        </Button>
        {showModal && (
          <ReusableModal
            showModal={showModal}
            closeModal={handleClose}
            handleSubmit={handleModalSubmit}
            editData={editData}
            title={editData ? "Edit Customer" : "Create Customer"}
            formFields={modalFields}
          />
        )}
      </div>
      <ReusableTable
        columns={modalFields}
        data={getCustomer}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <ReusableConfirmationModal
        showConfirmation={showConfirmation}
        handleConfirm={handleConfirmDelete}
        handleClose={() => setShowConfirmation(false)}
        message={confirmationMessage}
      />
    </div>
  );
}

export default Customers;
