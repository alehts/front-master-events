import React, {useContext} from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { DataContext } from '../../DataContext';

const Header = () => {
  const { keycloak } = useContext(DataContext);
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

  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
      <Container className="Container-Header">
        <Navbar.Brand>
          <Link to='/' onClick={handleRemoveFooterFix}>
            <div className="logo-container">
              <img src="/logo.svg" alt="MasterEvents Logo" width="100" height="57" />
              <div className="header-text">
                MasterEvents
              </div>
            </div>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto"> {/* 'ms-auto' para alinear a la derecha */}

            {/* Solo el user que pertenece al grupo CREAREVENTOS pude crear eventos */}
            {((keycloak.tokenParsed?.group)?.includes("CREAREVENTOS"))&&
                <Link to="/formevent" onClick={handleFooterFix} className="nav-link">
                  Crear Evento
                </Link>
            }

            {/*User Management*/}
            {(!keycloak.authenticated) &&
                <Link onClick={() => { keycloak.login() }} className="nav-link">
                  Iniciar sesión
                </Link>
            }
            {(keycloak.authenticated) &&
               <div>
                 <h4> Hola, {keycloak.tokenParsed.given_name}</h4>
                 <Link onClick={() => { keycloak.logout({ redirectUri: 'http://localhost:3000/' }) }} className="nav-link">
                   Cerrar sesión
                 </Link>


               </div>




            }

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;