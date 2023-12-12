import React, { useState, useEffect, useContext } from 'react';
import './ModalCard.scss';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { DataContext } from '../../DataContext';

function ModalCard(props) {
  const { keycloak } = useContext(DataContext);
  const { show, event, onHide } = props;

  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [emailUserName, setEmailUserName] = useState(null);

  useEffect(() => {
    // Use the Keycloak object to get the user ID after authentication
    if (keycloak.authenticated) {
      // setUserName(keycloak.tokenParsed.preferred_username);
      setUserId(keycloak.tokenParsed.sub);
      setUserName(keycloak.tokenParsed.name);
      setEmailUserName(keycloak.tokenParsed.email);
    }
  }, [keycloak.authenticated]);

  const imagenesFiltradas = event.images.filter((imagen) =>
    imagen.url.includes("600")
  );
  const imageUrl = imagenesFiltradas.length > 0 ? imagenesFiltradas[0].url : "";


  const date = new Date(event.date);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = date.toLocaleDateString(undefined, options);

  //********************************************************************* */

  const handleBuyClick = () => {
    // Obtener el carrito actual del sessionStorage
    const currentCart = JSON.parse(sessionStorage.getItem('carrito')) || [];

    // Verificar si el producto ya está en el carrito por id
    const productoItem = currentCart.find(item => item.id === event.id);

    if (productoItem) {
      // Si el producto ya está en el carrito, preguntar por la nueva cantidad
      const nuevaCantidad = (window.prompt('Ingrese la nueva cantidad:', productoItem.amount));
      console.log(nuevaCantidad);

      // Verificar si se ingresó una cantidad válida
      if (nuevaCantidad !== null && !isNaN(nuevaCantidad) && nuevaCantidad > 0) {
        // Convertir la nueva cantidad a número y sumarla a la cantidad existente en el carrito
        productoItem.amount = parseInt(productoItem.amount, 10) + parseInt(nuevaCantidad, 10);
      } else {
        // Si se ingresó una cantidad no válida, salir de la función
        return;
      }
    } else {
      // Si el producto no está en el carrito, asignar la cantidad directamente desde el prompt
      event.amount = window.prompt('Ingrese cantidad de tickets:', 1);

      // Verificar si se ingresó una cantidad válida
      if (event.amount === null || isNaN(event.amount) || event.amount <= 0) {
        // Si se ingresó una cantidad no válida, salir de la función
        return;
      }

      // Convertir la cantidad a número
      event.amount = parseInt(event.amount, 10);
      event.IdUserClient = userId
      event.nameUserClient = userName
      event.emailUserClient = emailUserName
    }

    // Resto del código...
    // Actualizar el carrito con el nuevo elemento o la cantidad actualizada
    const updatedCart = productoItem
      ? currentCart.map(item => (item.id === event.id ? productoItem : item))
      : [...currentCart, event];

    // Guardar el carrito actualizado en el sessionStorage
    sessionStorage.setItem('carrito', JSON.stringify(updatedCart));

    // Cerrar el modal después de hacer clic en "Comprar"
    onHide();
  };


  //********************************************************************* */

  return (
    <Modal style={{
      background: "linear-gradient(106.37deg, #ccfff688 29.63%, #cfcfff81 51.55%, #b59beda7 90.85%)"
    }} show={show} onHide={onHide} size="" aria-labelledby="contained-modal-title-vcenter" centered  >
      <Modal.Header className="ModalHeader" closeButton >
        <div className="title-container">
          <div className="title-image">
            <img src={imageUrl} alt={event.nameEvent} />
          </div>
          <div className="title-info">
            <h2 className="h2mio">{event.nameEvent}</h2>
            <p>{event.description}</p>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="body-container">
          <Container>
            <Row className="modalCardRow">
              <Col xs={12} md={8}>
                <div className="field">
                  <h5>Fecha:</h5>
                  <p>{formattedDate}</p>
                </div>
                <div className="field">
                  <h5>Categoría:</h5>
                  <p>{event.category}</p>
                </div>
                <div className="field">
                  <h5>Lugar:</h5>
                  <p>{event.location}</p>
                </div>
                <div className="field">
                  <h5>Dirección:</h5>
                  <p>{event.address}</p>
                </div>
                <div className="field">
                  <h5>Edad Mínima:</h5>
                  <p>{event.minimumAge} <span>Años</span></p>
                </div>
              </Col>
              <Col className="modal-card-button" xs={12} md={12} xl={12}>

                <div className="buy-button-container">
                  <Button variant="primary" style={{ backgroundColor: "rgb(235, 99, 99)", border: 'none' }} onClick={handleBuyClick}>
                    Comprar
                  </Button>
                </div>

              </Col>
            </Row>
          </Container>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalCard;
