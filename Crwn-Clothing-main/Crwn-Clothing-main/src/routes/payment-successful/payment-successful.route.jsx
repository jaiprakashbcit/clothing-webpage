import { useState, useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { clearAllItemsFromCart } from '../../store/cart/cart.slice';

import Button from '../../components/button/button.component';
import Modal, { MODAL_ICON_TYPES } from '../../components/modal/modal.component';

import './payment-successful.styles.scss';

function PaymentSuccessful() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    dispatch(clearAllItemsFromCart());
  }, [dispatch]);

  function returnToHome() {
    navigate('/');
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <Fragment>
      {isModalOpen ? (
        <div>
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            modalHeader={'Payment successful'}
            modalMessage={'Thank you for your order!'}
            ModalIconType={MODAL_ICON_TYPES.success}>
            <Button onClick={returnToHome}>home</Button>
            <Button onClick={closeModal}>close</Button>
          </Modal>
        </div>
      ) : (
        <div className="order-summary"></div>
      )}
    </Fragment>
  );
}

export default PaymentSuccessful;
