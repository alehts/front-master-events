import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './CarritoModal.scss';
import { DataContext } from '../../DataContext';
import { Link, useNavigate } from 'react-router-dom';



function CarritoModal({ show, onHide }) {
  const { keycloak } = useContext(DataContext);
  const [cart, setCart] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [clientSecret, setClientSecret] = useState(null);
  const [userId, setUserId] = useState(null);
  // const [userName, setUserName] = useState(null);

  useEffect(() => {
    // Use the Keycloak object to get the user ID after authentication
    if (keycloak.authenticated) {
      // setUserName(keycloak.tokenParsed.preferred_username);
      setUserId(keycloak.tokenParsed.sub);
    }
  }, [keycloak.authenticated]);

  useEffect(() => {
    // Cargar el carrito desde el sessionStorage al abrir el modal
    const currentCart = JSON.parse(sessionStorage.getItem('carrito')) || [];
    setCart(currentCart);

    // Calcular la cantidad y el valor total al abrir el modal
    calculateTotal(currentCart);
  }, [show]);


  const calculateTotal = (cart) => {

    const totalAmount = cart.reduce((total, item) => total + item.amount, 0);

    const value = cart.reduce((total, item) => total + item.price * item.amount, 0);

    setTotalQuantity(totalAmount);
    setTotalValue(value);
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);

    // Actualizar el carrito en sessionStorage
    sessionStorage.setItem('carrito', JSON.stringify(updatedCart));

    setCart(updatedCart);
    calculateTotal(updatedCart);
  };

  //*********************Enviar informacion Api************************ */
  // const handlePagarClick = () => {
    //   // Enviar el carrito al servidor (usando fetch o axios)
    //   fetch('http://localhost:8099/pagar', {
      //     method: 'POST',
      //     headers: {
  //       Authorization: `Bearer ${keycloak.token}`,
  //       'Content-Type': 'application/json;charset=UTF-8',
  //     },
  //     body: JSON.stringify(cart),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Manejar la respuesta del servidor si es necesario
  //     })
  //     .catch((error) => {
  //       console.error('Error al realizar el pago:', error);
  //     });
  // };

  //********************************************************* */

  const navigate = useNavigate();

  const handlePagarClick = () => {
    onHide();
    navigate('/stripe');
  };

  //********************************************************* */


  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="CarritoModalHeader">
        <Modal.Title id="h4Title" className="h1">CARRITO DE COMPRAS</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul className="list-unstyled">
          {/* Encabezado de la tabla */}
          <li className="row rowModalCarritoEncabezado">
            <div className="col">
              <h5>Evento</h5>
            </div>
            <div className="col encabezadoDescripcion">
              <h5>Descripción</h5>
            </div>
            <div className="col encabezadoCiudad">
              <h5>Ciudad</h5>
            </div>
            <div className="col">
              <h5>Cantidad</h5>
            </div>
            <div className="col">
              <h5>Valor</h5>
            </div>
            <div className="col">
              <h5>Valor Total</h5>
            </div>
            <div className="col">
              <h5>Eliminar</h5>
            </div>
          </li>

          {/* Elementos del carrito */}
          {cart.map((item, index) => (
            <li key={index} className="row rowModalCarritoBody">
              <div className="col">
                <p>{item.nameEvent}</p>
              </div>
              <div className="col bodyDescripcion">
                <p className="">{item.description}</p>
              </div>
              <div className="col bodyCity">
                <p className="">{item.city}</p>
              </div>
              <div className="col">
                <p>{item.amount}</p>
              </div>
              <div className="col">
                <p>{item.price}</p>
              </div>
              <div className="col">
                <p>{item.amount * item.price}</p>
              </div>

              <div className="col">
                <Button variant="danger" onClick={() => removeFromCart(index)}>
                  X
                </Button>
              </div>
            </li>
          ))}
        </ul>


        {/*************************************************************************** */}
        {/* Contenedor para Cantidad total, Valor total y Botón de pago */}
        <div className="total-container">
          {/* Cantidad total */}
          <div className="costoTotal">
            <div className="costo">
              <div>
                <h6>Cantidad total:</h6>
                <p>{totalQuantity}</p>
              </div>
              <div>
                <h6>Valor total:</h6>
                <p>${totalValue}</p>
              </div>
            </div>
            <div>
              <Button variant="success" onClick={handlePagarClick}>
                Pagar
              </Button>
            </div>
          </div>
        </div>
        {/*************************************************************************** */}
      </Modal.Body>
    </Modal>
  );
}

export default CarritoModal;


