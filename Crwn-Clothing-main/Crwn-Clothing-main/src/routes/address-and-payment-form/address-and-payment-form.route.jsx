import { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { AddressElement, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { selectTotalCartPrice } from '../../store/cart/cart.selector';

import Button, { BUTTON_TYPE_CLASSES } from '../../components/button/button.component';
import Spinner from '../../components/spinner/spinner.component';
import Modal, { MODAL_ICON_TYPES } from '../../components/modal/modal.component';

import './address-and-payment-form.styles.scss';

function AddressAndPaymentForm() {
  const amount = useSelector(selectTotalCartPrice);
  const stripe = useStripe();
  const elements = useElements();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  async function handleSubmitPayment(event) {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      return;
    }

    setIsProcessingPayment(true);

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      hearders: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount * 100, currency: 'usd' }),
    }).then((resp) => resp.json());

    const {
      paymentIntent: { client_secret: clientSecret },
    } = response;

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.href}-successful`,
      },
    });

    setIsProcessingPayment(false);

    if (error) {
      setModalText({ header: 'Error', message: `${error.message}` });
      setIsModalOpen(true);
    }
  }

  function handleIsModalOpen() {
    setIsModalOpen(false);
  }

  return (
    <Fragment>
      <form
        className="address-and-payment-container"
        onSubmit={handleSubmitPayment}>
        <div className="address-container">
          <h2>Shipping Details</h2>
          <AddressElement
            options={{
              mode: 'shipping',
            }}
          />
        </div>
        <div className="payment-container">
          <h2>Pay With Card</h2>
          <PaymentElement />
          {isProcessingPayment ? (
            <Spinner />
          ) : (
            <Button
              disabled={isProcessingPayment}
              type="submit">
              Pay now
            </Button>
          )}
        </div>
      </form>
      {isModalOpen && (
        <Modal
          onClose={handleIsModalOpen}
          isOpen={isModalOpen}
          modalHeader={modalText.header}
          modalMessage={modalText.message}
          ModalIconType={MODAL_ICON_TYPES.failed}>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.inverted}
            onClick={handleIsModalOpen}>
            Close
          </Button>
        </Modal>
      )}
    </Fragment>
  );
}

export default AddressAndPaymentForm;
