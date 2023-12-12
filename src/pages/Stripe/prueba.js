import React, { useEffect, useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { DataContext } from '../../DataContext';
import classnames from 'classnames';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './components/PaymentForm';
import Wrapper from '../../components/wrapper/Wrapper';
import styles from './Stripe.module.scss';
import ProductCard from './components/ProductCard';
import PaymentService from '../../services/paymentService';
import axios from 'axios';
import './Stripe.scss';
import LoadingComponent from '../../complementos/LoadingComponent/LoadingComponent';

import { Row, Col, Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
const url_backend = process.env.URL_DEL_BACKEND



const Stripe = () => {
    const { keycloak } = useContext(DataContext);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [clientSecret, setClientSecret] = useState(null);
    const [mockCart, setMockCart] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalValue, setTotalValue] = useState(0);

    const [processingPayment, setProcessingPayment] = useState(false);


    useEffect(() => {
        // Función asíncrona para cargar el carrito desde el sessionStorage
        const loadCart = async () => {
            const currentCart = JSON.parse(sessionStorage.getItem('carrito')) || [];
            setMockCart(currentCart);

            // Calcular la cantidad y el valor total al abrir el modal
            calculateTotal(currentCart);
        };
        // Llama a la función para cargar el carrito al montar el componente
        loadCart();
    }, []);



    const calculateTotal = (cart) => {
        const totalAmount = cart.reduce((total, item) => total + item.amount, 0);
        const value = cart.reduce((total, item) => total + item.price * item.amount, 0);

        setTotalQuantity(totalAmount);
        setTotalValue(value);
    };


    // const handlePagarClick = async () => {

    //     setProcessingPayment(true);  // Activar el estado de procesamiento

    //     const arrayMetadatos = mockCart.map(objeto => {
    //         return {
    //             dateEvent: objeto.date,
    //             name: objeto.nameEvent,
    //         };
    //     });
    //     const cadenaFormateada = JSON.stringify(arrayMetadatos, null, 2);
    //     console.log(cadenaFormateada);

    //     const dataTicket = {
    //         description: "Tickets MasterEvents",
    //         amount: totalValue,
    //         currency: "usd",
    //         order_data: cadenaFormateada
    //     }

    //     const service = new PaymentService();
    //     await service.createPaymentIntent({ keycloakData: keycloak, products: dataTicket, callbackSuccess: callbackSuccessPaymentIntent, callbackError: callbackErrorPaymentIntent })
    // };

    const handlePagarClick = async () => {

        // Verificar si el usuario está autenticado
        if (!keycloak.authenticated) {
            // Si no está autenticado, redirigir al inicio de sesión
            keycloak.login();
            return;
        }

        try {
            const arrayMetadatos = mockCart.map(objeto => {
                return {
                    dateEvent: objeto.date,
                    name: objeto.nameEvent,
                };
            });
            const cadenaFormateada = JSON.stringify(arrayMetadatos, null, 2);
            console.log(cadenaFormateada);

            const dataTicket = {
                description: "Tickets MasterEvents",
                amount: totalValue,
                currency: "usd",
                order_data: cadenaFormateada
            }

            const service = new PaymentService();
            const response = await service.createPaymentIntent({
                keycloakData: keycloak,
                products: dataTicket,
                callbackSuccess: callbackSuccessPaymentIntent,
                callbackError: callbackErrorPaymentIntent
            });

            callbackSuccessPaymentIntent(response);
        } catch (error) {
            callbackErrorPaymentIntent(error);
        } finally {
            setProcessingPayment(false);  // Desactivar el estado de procesamiento independientemente del resultado

        }
    };


    const callbackSuccessPaymentIntent = (res) => {
        setClientSecret(res.data.client_secret)
    }

    const callbackErrorPaymentIntent = err => {
        console.log(err);
    }

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

        if (clientSecret === null) {
            setProcessingPayment(true);
        }


        // Limpia la configuración cuando el componente se desmonta
        return () => {
          handleRemoveFooterFix();
        };
      }, [clientSecret]); // Se ejecutará cuando clientSecret cambie



    return (
        <>
            <div className="ContenedorStripprincipal">

                <Wrapper hidden={clientSecret}>
                    <ul className="list-unstyled">
                        <li className="row rowStripEncabezado">
                            <div className="col">
                            <h5>Evento</h5>
                            </div>
                            <div className="col encabezadoStripDescripcion">
                            <h5>Descripción</h5>
                            </div>
                            <div className="col encabezadoStripCiudad">
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
                        </li>

                        {mockCart.map((item, index) => (
                            <li key={index} className="row rowStripeBody">
                            <div className="col">
                                <p>{item.nameEvent}</p>
                            </div>
                            <div className="col bodyStripDescripcion">
                                <p className="">{item.description}</p>
                            </div>
                            <div className="col bodyStripCity">
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

                            </li>
                        ))}
                    </ul>

                    <div className="total-strip-container">
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
                                {!processingPayment ? (
                                        <>
                                            Procesando...
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                                className="ml-1"
                                            />
                                        </>
                                    ) : (
                                        'Procesar el pago'
                                )}
                        </Button>
                        </div>
                    </div>
                    </div>

                </Wrapper>


                <Wrapper hidden={!clientSecret || !stripePromise}>
                    <Elements stripe={stripePromise} options={{ clientSecret: clientSecret }}>
                        <PaymentForm />
                    </Elements>
                </Wrapper>

            </div>
        </>
    )
}

export default Stripe;