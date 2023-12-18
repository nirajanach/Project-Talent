import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios"; // Import axios to send the POST request
import BASE_URL from "../constants/LocalStorageKeys";

function Example({ showModal, closeModal }) {
  const [show, setShow] = useState(showModal);
  const [name, setName] = useState(""); // State variable for the name
  const [address, setAddress] = useState(""); // State variable for the address

  const handleClose = () => closeModal();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the form from reloading the page

     const url = BASE_URL + "Customer";
    // Send a POST request to the server
    const response = await axios.post(url, { name, address });

    // Handle the response as needed
    console.log(response.data);

    handleClose(); // Close the modal
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create a Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {" "}
            {/* Attach the handleSubmit function to the form submit event */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="input"
                placeholder="Name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />{" "}
              {/* Bind the name state variable to the input */}
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="input"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />{" "}
              {/* Bind the address state variable to the input */}
            </Form.Group>
            <Button variant="primary" type="submit" onSubmit={handleClose}>
              {" "}
              {/* Change the type of the button to submit to trigger the form submission */}
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
