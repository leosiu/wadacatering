// assets
import paypal from 'assets/images/e-commerce/paypal.png';
//import card from 'assets/images/e-commerce/card.png';

// ==============================|| CHECKOUT - PAYMENT OPTIONS ||============================== //

const PaymentOptions = [
    {
    id: 1,
    value: 'paypal',
    title: 'Pay with PayPal',
    caption: '',
    image: paypal,
    size: {
      width: 73,
      height: 14
    }
  }
];

export default PaymentOptions;
