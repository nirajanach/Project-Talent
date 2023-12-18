import React from 'react';
import { Button } from 'react-bootstrap';

const Table = ({columns, data}) => {
    return (
      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th scope="col" key={index}>
                  {column}
                </th>
              ))}
              <th scope="col">Actions</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
          {console.log(data)}
            {data.map((row, index) => (
              <tr key={index}>
                {columns.map((column, index) => (
                  <td key={index}>{row[column]}</td>
                ))}
                <td scope="col" >
                  <Button className="" variant="warning" >
                    Edit
                  </Button>
                </td>
                <td scope="col" >
                  <Button className="align-center" variant="danger">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default Table;
