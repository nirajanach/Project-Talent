// Products.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import BASE_URL from "../constants/LocalStorageKeys";
import ReusableModal from "../Components/Modal/ReusableModal";
import ReusableTable from "../Components/Table/ReusableTable";
import ReusableConfirmationModal from "../Components/Modal/ReusableConfirmationModal";

function Products() {
  // ... (existing code)
    const [getProduct, setGetProduct] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [deleteRecordId, setDeleteRecordId] = useState(null);
    const [editData, setEditData] = useState(null);
     const [confirmationMessage, setConfirmationMessage] = useState(
       "Are you sure you want to delete this record?"
     );

  const customerColumns = [
    { id: "name", label: "Name" },
    { id: "address", label: "Address" },
  ];

  const productColumns = [
    { id: "name", label: "Name" },
    { id: "price", label: "Price" },
  ];

  const [modalFields, setModalFields] = useState(productColumns);

   useEffect(() => {
     fetchProducts();
   }, [showModal]);

   const fetchProducts = async () => {
     const response = await axios.get(BASE_URL + "Product");
     setGetProduct(response.data);
   };

   const handleShow = () => setShowModal(!showModal);

   const handleClose = () => {
     setShowModal(false);
     setEditData(null);
   };

   const handleEdit = (id) => {
     const dataToEdit = getProduct.find((product) => product.id === id);
     setEditData(dataToEdit);
     setShowModal(true);
   };

   const handleDelete = (id) => {
     setDeleteRecordId(id);
     setShowConfirmation(true);
   };

   const handleConfirmDelete = async () => {
     const url = `${BASE_URL}Product/${deleteRecordId}`;
     await axios.delete(url);
     fetchProducts();
     setShowConfirmation(false);
   };

  const handleModalSubmit = async (event, formData) => {
    event.preventDefault();
    const url = BASE_URL + "Product";
    const data = editData ? { ...formData, id: editData.id } : formData;

    const response = editData
      ? await axios.put(`${url}/${editData.id}`, data)
      : await axios.post(url, data);

    if (!editData) {
      setGetProduct((prevProducts) => [...prevProducts, response.data]);
    }

    console.log("Record saved successfully");
    handleClose();
  };

  // ... (existing code)

  return (
    <div className="container">
      <div className="btn-group">
        <Button className="mb-2 me-1" variant="primary" onClick={handleShow}>
          New Product
        </Button>
        {showModal && (
          <ReusableModal
            showModal={showModal}
            closeModal={handleClose}
            handleSubmit={handleModalSubmit}
            editData={editData}
            title={editData ? "Edit Product" : "Create Product"}
            formFields={modalFields}
          />
        )}
      </div>
      <ReusableTable
        columns={modalFields}
        data={getProduct}
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

export default Products;
