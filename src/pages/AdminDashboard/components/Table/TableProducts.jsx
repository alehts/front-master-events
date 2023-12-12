import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";

function createData(name, trackingId, date, status) {
  return { name, trackingId, date, status };
}

// Data de tabla de Ordenes de compra
const rows = [
  createData("Lasania Chiken Fri", 18908424, "2 March 2022", "Approved"),
  createData("Big Baza Bang ", 18908424, "2 March 2022", "Pending"),
  createData("Mouth Freshner", 18908424, "2 March 2022", "Approved"),
  createData("Cupcake", 18908421, "2 March 2022", "Delivered"),
];


const makeStyle = (status) => {
  if (status > 500) {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if (status < 500) {
    return {
      background: '#ffadad8f',
      color: 'red',
    }
  }
  else {
    return {
      background: '#59bfff',
      color: 'white',
    }
  }
}

export default function BasicTable({ productList }) {
  return (
    <div className="Table" >
      <h3>Lista de productos creados</h3>
      <TableContainer
        component={Paper}
        className="dashBoardProductContainer"
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="left">Ciudad</TableCell>
              <TableCell align="left">Fecha</TableCell>
              <TableCell align="left">Stock</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {productList.map((row) => (
              <TableRow
                key={row?.nameEvent}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.nameEvent}
                </TableCell>
                <TableCell align="left">{row?.city}</TableCell>
                <TableCell align="left">{row?.date}</TableCell>
                <TableCell align="left">
                  <span className="status" style={makeStyle(row?.stock)}>{row?.stock}</span>
                </TableCell>
                {/* <TableCell align="left" className="Details">Details</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
