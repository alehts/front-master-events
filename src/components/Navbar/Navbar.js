import React, { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import { DataContext } from '../../DataContext';
import './Navbar.scss';
import CarritoModal from '../Carrito/CarritoModal';

function OffcanvasExample({ carrito }) {
  const { keycloak } = useContext(DataContext);

  const [isLoggedIn, setIsLoggedIn] = useState(keycloak.authenticated);

  const [showCarritoModal, setShowCarritoModal] = useState(false);
  const [cantItems, setCantItems] = useState(null);

  //****************************Mostrar Carrito*************************** */

  // Estado para verificar si hay información en el carrito
  const [isCartEmpty, setIsCartEmpty] = useState(true);

  useEffect(() => {
    // Verificar inicialmente si hay información en el carrito al cargar el componente
    const initialCart = JSON.parse(sessionStorage.getItem('carrito')) || [];
    setIsCartEmpty(initialCart.length === 0);

    // Establecer un temporizador para verificar cada 500ms
    const intervalId = setInterval(() => {
      const updatedCart = JSON.parse(sessionStorage.getItem('carrito')) || [];
      // console.log(updatedCart);
      let cantItems = calcuCant(updatedCart)
      setCantItems(cantItems)
      setIsCartEmpty(updatedCart.length === 0);
    }, 500);

    const calcuCant = (data) => {
      let totalCant = data.reduce((current, item) => {
        return current + item.amount;
      }, 0)
      return totalCant
    }

    // Limpiar el temporizador cuando el componente se desmonta
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Sin dependencias, se ejecutará solo una vez al montar el componente


  //****************************************************************** */

  useEffect(() => {

    //***************Refresh token*************** */
    const intervalId = setInterval(() => {
      keycloak
        .updateToken(10)
        .catch((error) => {
          console.error('Refresh Error:', error);
        });
    }, 10000);
    //******************************************* */

    // Configuramos listeners para manejar cambios en la autenticación
    const onAuthSuccess = () => setIsLoggedIn(true);
    const onAuthLogout = () => setIsLoggedIn(false);

    keycloak.onAuthSuccess = onAuthSuccess;
    keycloak.onAuthLogout = onAuthLogout;

    // Limpieza de listeners cuando el componente se desmonta
    return () => {
      clearInterval(intervalId);
      keycloak.onAuthSuccess = null;
      keycloak.onAuthLogout = null;
    };
  }, [keycloak]);




  const handleLoginLogout = () => {
    if (isLoggedIn) {
      keycloak.logout({ redirectUri: 'http://localhost:3000/' });
    } else {
      keycloak.login();
    }
  };

  const handleCarritoClick = () => {
    setShowCarritoModal(true);
  };

  const handleCloseCarritoModal = () => {
    setShowCarritoModal(false);
  };


  return (
    <>
      <Navbar expand="lg"  className="bg-body-tertiary mb-3 navbar-expand-sm me-navbar">
        <Container fluid>
          <Navbar.Brand>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <div className="logo-container">
                <img src="/logo.svg" alt="MasterEvents Logo" width="100" height="57" />
                {/* <div className="header-text">MasterEvents</div> */}
                <div className='logo-nav'>
                  <span >
                    Master<span>E</span>vents
                  </span>
                </div>

              </div>
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-expand`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-expand`}
            aria-labelledby={`offcanvasNavbarLabel-expand-expand`}
            placement="end"
            className="menavbar-offcanvas"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-expand`}>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3 me-nav">
{/*
              {(keycloak.tokenParsed?.group?.includes("CREAREVENTOS")) &&
                  <Nav.Link href="/formevent" className="me-btn-formevent">
                    Crear Evento
                  </Nav.Link>
              } */}

              {(keycloak.tokenParsed?.group?.includes("CREAREVENTOS")) &&
                  <Link to="/formevent" style={{ textDecoration: 'none' }} className="me-btn-formevent">
                    Crear Evento
                  </Link>
              }

              {/* {(keycloak.tokenParsed?.group?.includes("CREAREVENTOS")) &&
                  <Nav.Link href="/admin" style={{ textDecoration: 'none' }} className="me-btn-formevent">
                    Admin
                  </Nav.Link>
              } */}

              {(keycloak.tokenParsed?.group?.includes("CREAREVENTOS")) &&
                  <Link to="/admin" style={{ textDecoration: 'none' }} className="me-btn-formevent">
                    Admin
                  </Link>
              }

                {(!(keycloak.tokenParsed?.group?.includes("CREAREVENTOS"))) &&
                    <Link to="/admin" style={{ textDecoration: 'none' }} className="me-btn-formevent">
                      Soy empresa
                    </Link>
                }

                {/* {(keycloak.tokenParsed?.group?.includes("CREAREVENTOS")) &&
                  <Link to="/admin" style={{ textDecoration: 'none' }} className="me-btn-formevent" onClick={handleFooterFix}>
                    Admin
                  </Link>
                } */}

                {/* <Nav.Link onClick={handleCarritoClick}><i class="bi bi-cart4 shopping-cart"></i></Nav.Link> */}


                {/* Mostrar el enlace del carrito solo si no está vacío */}
                {!isCartEmpty && (
                  <Nav.Link onClick={handleCarritoClick}>
                    <i className="bi bi-cart4 shopping-cart"></i> <Badge bg="light" text="dark">{cantItems}</Badge>
                  </Nav.Link>
                )}



                <div className="melogin">
                  {isLoggedIn && <div><h5>Hola, {keycloak.tokenParsed.preferred_username}</h5></div>}
                  <Nav.Link className={`me-btn-login ${isLoggedIn ? 'me-btn-login-out' : ''}`} onClick={handleLoginLogout}>
                    {isLoggedIn ? `Cerrar sesión` : `Iniciar sesión`}
                  </Nav.Link>

                </div>


              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar >
      <CarritoModal show={showCarritoModal} onHide={handleCloseCarritoModal} />
    </>
  );
}

export default OffcanvasExample;
