// Stores.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import BASE_URL from "../constants/LocalStorageKeys";
import ReusableModal from "../Components/ReusableComponents/ReusableModal";
import ReusableTable from "../Components/ReusableComponents/ReusableTable";
import ReusableConfirmationModal from "../Components/ReusableComponents/ReusableConfirmationModal";

function Stores() {
  const [getStore , setGetStore] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteRecordId, setDeleteRecordId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [confirmationMessage ] = useState(
    "Are you sure ?"
  );

  const storeColumns = [
    { id: "name", label: "Name" },
    { id: "address", label: "Address" },
  ]; 
  const [modalFields] = useState(storeColumns);
  
  useEffect(() => {
    fetchStores();
  }, [showModal]);

  const fetchStores = async () => {
    const response = await axios.get(BASE_URL + "Store");
    setGetStore(response.data);
  };

  const handleShow = () => setShowModal(!showModal);

  const handleClose = () => {
    setShowModal(false);
    setEditData(null);
  };

  const handleEdit = (id) => {
    const dataToEdit = getStore.find((store) => store.id === id);
    setEditData(dataToEdit);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setDeleteRecordId(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    const url = `${BASE_URL}Store/${deleteRecordId}`;
    await axios.delete(url);
    fetchStores();
    setShowConfirmation(false);
  };

  const handleModalSubmit = async (event, formData) => {
    event.preventDefault();
    const url = BASE_URL + "Store";
    const data = editData ? { ...formData, id: editData.id } : formData;

    const response = editData
      ? await axios.put(`${url}/${editData.id}`, data)
      : await axios.post(url, data);

    if (!editData) {
      setGetStore((prevStores) => [...prevStores, response.data]);
    }

    console.log("Record saved successfully");
    handleClose();
  };

  // ... (existing code)

  return (
    <div className="container">
      <div className="btn-group">
        <Button className="mb-2 me-1" variant="primary" onClick={handleShow}>
          New Store
        </Button>
        {showModal && (
          <ReusableModal
            showModal={showModal}
            closeModal={handleClose}
            handleSubmit={handleModalSubmit}
            editData={editData}
            title={editData ? "Edit Store" : "Create Store"}
            formFields={modalFields}
          />
        )}
      </div>
      <ReusableTable
        columns={modalFields}
        data={getStore}
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

export default Stores;
