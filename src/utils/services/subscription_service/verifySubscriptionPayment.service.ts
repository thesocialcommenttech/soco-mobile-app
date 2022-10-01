import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  VerifySubscriptionPaymentRequest,
  VerifySubscriptionPaymentResponse
} from '../../typings/subscription_interface/verifySubscriptionPayment.interface';

export function verifySubscriptionPayment({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  transaction_id
}: VerifySubscriptionPaymentRequest): Promise<
  AxiosResponse<VerifySubscriptionPaymentResponse>
> {
  const config: AxiosRequestConfig = {
    url: 'https://thesocialcomment-backend-test.herokuapp.com/subscription/verify-payment',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      transaction_id
    }
  };

  return axios.request<VerifySubscriptionPaymentResponse>(config);
}
