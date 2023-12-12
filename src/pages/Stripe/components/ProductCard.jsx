
import styles from '../Stripe.module.scss'
import ListGroup from 'react-bootstrap/ListGroup';

const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
};

const ProductCard = ({ product }) => {
    return (<>

        <tbody>
            <tr>
                <td class="border border-slate-700 ...">{product.nameEvent}</td>
                <td class="border border-slate-700 ...">{product.category}</td>
                <td class="border border-slate-700 ...">{product.city}</td>
                <td class="border border-slate-700 ...">{product.amount}</td>
                <td class="border border-slate-700 ...">{product.price * product.amount}</td>
                <td class="border border-slate-700 ...">{new Date(product.date).toLocaleDateString('es-ES', options)}</td>
            </tr>
        </tbody>
    </>)
}

export default ProductCard;