// import * as React from "react";
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DataContext } from '../../../../DataContext';
import { getHeaders } from '../../../../utils/http';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";



const makeStyle = (status) => {
  if (status === 'succeeded') {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if (status === 'requires_payment_method') {
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

export default function BasicTable({ minItems }) {
  const [paymentIntents, setPaymentIntents] = useState([]);
  const [paymentIntentsOrders, setPaymentIntentsOrders] = useState([]);
  const { keycloak } = useContext(DataContext);




  useEffect(() => {
    // Llamar a la API para obtener los datos de los paymentIntents
    axios.get('/stripe/search-all', getHeaders(keycloak))
      .then(response => {
        setPaymentIntents(response.data.data);
      })
      .catch(error => {
        console.error('Error al obtener datos de la API:', error);
      });
  }, []); // La dependencia vacía asegura que se llama solo una vez al montar el componente



  // Función para filtrar por idCompany
  const filtrarPorIdCompany = (idCompany) => {

    const orders = []
    const paymentIntentsFiltrados = paymentIntents.filter(intent => {
      try {
        const metadata = JSON.parse(intent.metadata.order_data);
        const metadataSome = metadata.some(item => {
          if (item.idCompany === idCompany) {
            console.log("metadataSome", item);
            console.log("METADATA", intent);
            const obj = {
              trackingId: intent.id,
              prodcut: item.nameEvent,
              date: intent.created,
              status: intent.status
            }
            orders.push(obj)
          }
        });
      } catch (error) {
        console.error('Error al parsear metadata:', error);
        return false;
      }
    });

    // Hacer algo con los paymentIntents filtrados
    setPaymentIntentsOrders(orders)
  };

  // Llamada a la función de filtrado, reemplaza 'TU_ID_COMPANY' con el ID que estás buscando
  useEffect(() => {
    filtrarPorIdCompany(keycloak.subject);
  }, [paymentIntents]); // Ejecuta la función cada vez que cambian los paymentIntents


  return (
    <div className="Table">
      <h3>Recent Orders</h3>
      <TableContainer
        component={Paper}
        className="dashboardTableOrderDetail"
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 600 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="left">Tracking ID</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {

              ((!minItems) ? paymentIntentsOrders : paymentIntentsOrders.slice(0, minItems)).map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.prodcut}
                  </TableCell>
                  <TableCell align="left">{row.trackingId}</TableCell>
                  <TableCell align="left">{new Date(row.date * 1000).toLocaleString()}</TableCell>
                  <TableCell align="left">
                    <span className="status" style={makeStyle(row.status)}>{row.status}</span>
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
