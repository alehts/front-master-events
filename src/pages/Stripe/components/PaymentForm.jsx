import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect } from 'react';
import { createAlert, createAlertWithCallback } from '../../../utils/alerts';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import './PaymentForm.scss';
import styles from '../Stripe.module.scss';

const PaymentForm = ({shoppingCart}) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required'
        })
        if (!error) {

            const itemsDiscount = shoppingCart.map(objeto => {
                return {
                    substract: objeto.amount,
                    _id: objeto.id,
                };
            });
            console.log(itemsDiscount);

            try {
                const response = await axios.post('/event/stock', itemsDiscount, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log(response);
                if (response.status === 200) {
                    console.log('Descuento aplicado con éxito');
                    // Resto de tu lógica después de aplicar el descuento
                    sessionStorage.removeItem('carrito');
                    createAlertWithCallback('success', '¡Pago completado!', 'El pago ha sido procesado con éxito', () => window.location.replace('/'));
                } else {
                    console.error('Error al aplicar el descuento:', response.statusText);
                    createAlert('error', 'Error al procesar el pago', 'No se pudo aplicar el stock');
                }
            } catch (error) {
                console.error('Error de red:', error);
                createAlert('error', 'Error al procesar el pago', 'Error de red al aplicar el stock');
            }


        } else {
            console.log(error);
            createAlert('error', 'Error al procesar el pago', error.message)
        }
    }
    return <>
        <form >
            <PaymentElement />
            <div className="DivPaymentFormBTN">
                <Button className="btn" variant="success" onClick={handleSubmit}>
                    Pagar
                </Button>
            </div>
        </form>
    </>
}
export default PaymentForm;