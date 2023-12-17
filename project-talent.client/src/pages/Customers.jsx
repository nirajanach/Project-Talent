import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Table from '../Components/Table/Table';
import tableContextsData from '../contexts/tableContextsData';
import BASE_URL from '../constants/LocalStorageKeys';


function Customers() { 

const [getCustomer, setGetCustomer] = useState([]);

  const columns = tableContextsData[0].columnNames;

    // More customers...

const handleCreate = () => {
  setCustomer(data);
}

const handleGetCustomers = async () => {
  const url = BASE_URL + "Customer";

  try {
    await axios.get(url).then((response) => {
      const resData = response.data;
      const formattedResData = resData.map(({ id, ...item }) => item);
      console.log(data);
      console.log(formattedResData);
      setGetCustomer((currentCustomer) => {
        return [...currentCustomer, ...formattedResData];
      });
    });
  } catch (error) {
    console.error("Error: ", error);
  }
};


    return (
      <>
        <div className="container ">
          <div className="btn-group">
            <Button
              className="mb-2 me-1"
              variant="primary"
              onClick={handleCreate}
            >
              New Customer
            </Button>
            <Button
              className="mb-2"
              variant="primary"
              onClick={handleGetCustomers}
            >
              Get Customer
            </Button>
          </div>
          <Table columns={columns} data={getCustomer} />
        </div>
      </>
    );
}

export default Customers;
