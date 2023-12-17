import { createContext, useContext } from "react";
import TableHeadColumn from "./TableHeadComponent/TableHeadColumn";
import { TableContext } from "../../../contexts/Context";
// import TableHeadColumn from "./TableHeadComponent/TableHeadColumn";

function TableHead() {

  const tableContext = useContext(TableContext);  
      const columns = tableContext[0].columnNames;
  
  return (
    <>
      {console.log(columns)}
      <thead>
      <tr>
        {columns.map((column, index) => (
          <th key={index}>{column}</th>
        ))}
      </tr>
    </thead>
    </>
  );
}

   
//   return (
//     <>
//       <thead>
//         <tr>
//           <TableHeadColumn/>

//           {/* <TableHeadColumn columnName="Address" />
//           <TableHeadColumn columnName="Actions" />
//           <TableHeadColumn columnName="Actions" /> */}
//         </tr>
//       </thead>
//     </>
//   );
// }

export default TableHead;
