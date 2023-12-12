import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { DataContext } from '../../DataContext';
import './AdminDashboard.css'
import axios from 'axios';
import { actualizarArraysConApi } from './Data/Data';
import MainDash from './components/MainDash/MainDash';
import MainListProducts from './components/MainListProducts/MainDash';
import MainOrders from './components/MainOrders/MainOrders';
import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/Sidebar';

function AdminDashboard() {
  const [datosApi, setDatosApi] = useState(null);
  const { keycloak } = useContext(DataContext);
  const [dataKeycloak, setDataKeycloak] = useState(null)



  useEffect(() => {
    setDataKeycloak(keycloak)
  }, [])


  useEffect(() => {
    console.log(dataKeycloak);
    // URL de la API
    const apiUrl = 'http://localhost:9090/event/idcompany/' + keycloak?.subject;
    // Realizar la solicitud a la API
    axios.get(apiUrl)
      .then(response => {
        // Manejar la respuesta de la API
        console.log('Respuesta de la API:', response.data);
        setDatosApi(response.data);

        console.log("productos", response.data);

        // Actualizar los arrays de objetos con la respuesta de la API
        actualizarArraysConApi(response.data);

      })
      .catch(error => {
        // Manejar errores
        console.error('Error al obtener datos de la API:', error);
      });
  }, [keycloak]); //


      //****************************Footer******************************** */

      const handleFooterFix = () => {
        const footerElement = document.querySelector('.footer');
        if (footerElement) {
          footerElement.style.position = 'fixed';
          footerElement.style.bottom = '0';
        }

      };

      const handleRemoveFooterFix = () => {
        const footerElement = document.querySelector('.footer');
        if (footerElement) {
          footerElement.style.position = ''; // Restablecer la posición predeterminada
          footerElement.style.bottom = '';
        }

      };

      useEffect(() => {
        // Aquí puedes llamar a la función que ajusta el footer cuando el componente se monta
        handleFooterFix();

        // Limpia la configuración cuando el componente se desmonta
        return () => {
          handleRemoveFooterFix();
        };
      }, []); // Se ejecutará cuando clientSecret cambie

      //********************************************************************** */

  return (
    <div className="AdminDashboard">
      <div className="AppGlassDashboard">
        {/* <Outlet /> */}
        <Sidebar />
        <Routes>
          <Route path="/" element={<MainDash />} />
          <Route path="/Dashboard" element={<MainDash />} />
          <Route path="/Ordenes" element={<MainOrders />} />
          <Route path="/Productos" element={<MainListProducts products={datosApi} />} />
        </Routes>
        <RightSide />
      </div>
    </div >
  );
}

export default AdminDashboard;
