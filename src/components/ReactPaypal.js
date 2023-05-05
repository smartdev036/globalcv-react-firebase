import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

export default class PaypalButton extends React.Component {
    constructor(props) {
        super(props);
    }

  render() {
    const onSuccess = payment => {
      console.log('The payment was succeeded!', payment);
      this.props.paypalSuccess();
    }

    const onCancel = data => {
      console.log('The payment was cancelled!');
    }

    const onError = err => {
      console.log("PAYPAL ERROR@!!!!!",err);
    }

    let env = 'production';
    let currency = 'USD';
    let total = this.props.total;

    const client = {
      sandbox: 'AX86zDwV2tEEJMI4XLQhnPDjHhZvk5oD0FP4ohrsUq5apKQ-gxbC6hhIeTXZyvw1Em-BjGEso9Q90R1g',
      production: 'AdYp-rwgG_M62WSwhbMVvj9rPkT0iJdq3b5taS-OpHMPdRbb9i2v-hgNH6YBgwPgqWP2JwfvyM8xwuHt',
    }


    return (
      <PaypalExpressBtn
        env={env}
        client={client}
        currency={currency}
        total={total}
        onError={onError}
        onSuccess={onSuccess}
        onCancel={onCancel}
      ></PaypalExpressBtn>
    )
  }
}