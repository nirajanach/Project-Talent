// ReusableTable.js
import React from "react";
import { Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";

function ReusableTable({ columns, data, handleEdit, handleDelete }) {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="table-responsive">
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            {columns.map((column) => (
              <th scope="col" key={column.id}>
                {capitalizeFirstLetter(column.label)}
              </th>
            ))}
            <th scope="col">Actions</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={column.id}>{row[column.id]}</td>
              ))}
              <td scope="col">
                <Button
                  className="text-centerss"
                  variant="warning"
                  onClick={() => handleEdit(row.id)}
                >
                  <FaEdit />
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
    </div>
  );
}

export default ReusableTable;
