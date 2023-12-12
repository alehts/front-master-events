import axios from "axios";
import { getHeaders } from "../utils/http";
import AxiosClient from "./axiosClient";

// const { REACT_APP_BASE_URL, REACT_APP_PAYMENT_ENDPOINT } = process.env;

export default class PaymentService {
    constructor() {
        this.client = new AxiosClient();
    }

    createPaymentIntent = async ({ keycloakData, products, callbackSuccess, callbackError }) => {

        const requestInfo = { url: `/stripe/paymentintent`, body: products, config: getHeaders(keycloakData), callbackSuccess, callbackError }
        const result = this.client.makePostRequest(requestInfo);
        console.log(result);

        // const requestInfo = { url: `${REACT_APP_BASE_URL}${REACT_APP_PAYMENT_ENDPOINT}/payment-intents?id=${productId}`, callbackSuccess, callbackError };
        // console.log(REACT_APP_BASE_URL);
        // this.client.makePostRequest(requestInfo);
    }

}