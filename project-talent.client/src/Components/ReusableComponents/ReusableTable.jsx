// ReusableTable.js
import React from "react";
import { Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

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
                <td key={column.id}>
                  {column.id === "dateSold" // Excluding the time from the date
                    ? new Date(row[column.id]).toLocaleDateString()
                    : row[column.id]}
                </td>
              ))}
              <td scope="col">
                <Button variant="warning" onClick={() => handleEdit(row.id)}>
                  <FaEdit />
                  <span style={{ marginLeft: "2px", verticalAlign: "middle" }}>
                    Edit
                  </span>
                </Button>
              </td>
              <td scope="col">
                <Button
                  className="align-center"
                  variant="danger"
                  onClick={() => handleDelete(row.id)}
                >
                <MdDelete/>
                  <span style={{ marginLeft: "2px", verticalAlign: "middle" }}>
                    Delete
                  </span>
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
