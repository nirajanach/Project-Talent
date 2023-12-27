// Sales.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import BASE_URL from "../constants/LocalStorageKeys";
import ReusableModal from "../Components/ReusableComponents/ReusableModal";
import ReusableTable from "../Components/ReusableComponents/ReusableTable";
import ReusableConfirmationModal from "../Components/ReusableComponents/ReusableConfirmationModal";
function Sales() {
  const [getSales, setGetSales] = useState([]);
  const [getCustomers, setGetCustomers] = useState([]);
  const [getProducts, setGetProducts] = useState([]);
  const [getStores, setGetStores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteRecordId, setDeleteRecordId] = useState(null);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchSales();
    fetchCustomers();
    fetchProducts();
    fetchStores();
  }, [showModal]);

  const fetchSales = async () => {
    const response = await axios.get(BASE_URL + "Sale");
    setGetSales(response.data);
  };

  const fetchCustomers = async () => {
    const response = await axios.get(BASE_URL + "Customer");
    setGetCustomers(response.data);
  };

  const fetchProducts = async () => {
    const response = await axios.get(BASE_URL + "Product");
    setGetProducts(response.data);
  };

  const fetchStores = async () => {
    const response = await axios.get(BASE_URL + "Store");
    setGetStores(response.data);
  };

  // ... (existing code for handleShow, handleClose, handleEdit, handleDelete)
 const handleShow = () => setShowModal(!showModal);

 const handleClose = () => {
   setShowModal(false);
   setEditData(null);
 };

 const handleEdit = (id) => {
   const dataToEdit = getSales.find((sale) => sale.id === id);
   setEditData(dataToEdit);
   setShowModal(true);
 };

 const handleDelete = (id) => {
   setDeleteRecordId(id);
   setShowConfirmation(true);
 };

 const handleConfirmDelete = async () => {
   const url = `${BASE_URL}Sale/${deleteRecordId}`;
   await axios.delete(url);
   fetchSales();
   setShowConfirmation(false);
 };


  const handleModalSubmit = async (event, formData) => {
    event.preventDefault();
    const url = BASE_URL + "Sale";

    formData.customerId = parseInt(formData.customerId, 10) || null ;
    formData.productId = parseInt(formData.productId, 10) || null;
    formData.storeId = parseInt(formData.storeId, 10) || null;
 
    // Ensure to set the correct IDs for the dropdown fields
    const data = editData
      ? {
          ...formData,
          customerId: formData.customerId || editData.customerId,
          productId: formData.productId || editData.productId,
          storeId: formData.storeId || editData.storeId,
          id: editData.id,
        }
      : formData;
console.log("EditData:", editData);

console.log("Data:", data);

    const response = editData
      ? await axios.put(`${url}/${editData.id}`, data)
      : await axios.post(url, data);

    if (!editData) {
      setGetSales((prevSales) => [...prevSales, response.data]);
    }

    console.log("Record saved successfully with " + response.data);
    handleClose();
  };

  const salesColumns = [
    { id: "customerName", label: "Customer" },
    { id: "productName", label: "Product" },
    { id: "storeName", label: "Store" },
    { id: "dateSold", label: "Date Sold" },
  ];

  const salesModalFields = [
    {
      id: "customerId",
      label: "Customer",
      type: "dropdown",
      options: getCustomers,
    },
    {
      id: "productId",
      label: "Product",
      type: "dropdown",
      options: getProducts,
    },
    { id: "storeId", label: "Store", type: "dropdown", options: getStores },
    { id: "dateSold", label: "Date Sold", type: "date" },
  ];

  return (
    <div className="container">
      <div className="btn-group">
        <Button className="mb-2 me-1" variant="primary" onClick={handleShow}>
          New Sale
        </Button>
        {showModal && (
          <ReusableModal
            showModal={showModal}
            closeModal={handleClose}
            handleSubmit={handleModalSubmit}
            editData={editData}
            title={editData ? "Edit Sale" : "Create Sale"}
            formFields={salesModalFields}
          />
        )}
      </div>
      <ReusableTable
        columns={salesColumns}
        data={getSales.map((sale) => ({
          ...sale,
          customerName: sale.customerName,
          productName: sale.productName,
          storeName: sale.storeName,
        }))}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <ReusableConfirmationModal
        showConfirmation={showConfirmation}
        handleConfirm={handleConfirmDelete}
        handleClose={() => setShowConfirmation(false)}
        message="Are you sure ?"
      />
    </div>
  );
}

export default Sales;
