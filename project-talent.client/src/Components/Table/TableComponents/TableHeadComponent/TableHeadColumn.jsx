
import { createContext, useContext } from "react";
import { TableContext } from "../../../../contexts/Context";

function TableHeadColumn() {

    const tableData = useContext(TableContext);

    const columnNames = tableData.columnNames;



 let headers = [];


  columnNames.forEach((name) => {
    headers.push(<th key={columnNames.key}>{name}</th>);
  });

    
  return (
    <>
          {headers}
      

      {/* <th scope="col">{tableData[0].numberOfColumns}</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th> */}
    </>
  );
}

export default TableHeadColumn;
