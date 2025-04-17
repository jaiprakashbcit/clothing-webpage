import { useEffect, useRef } from 'react';

import Lottie from 'lottie-react';
import success from '../../assets/svg-animation/green-check-animation.json';
import failed from '../../assets/svg-animation/red-x-animation.json';
import alert from '../../assets/svg-animation/circle-alert-animation.json';

import './modal.styles.scss';

export const MODAL_ICON_TYPES = {
  success: 'success',
  failed: 'failed',
  alert: 'alert',
};

function Modal({ isOpen, onClose, modalHeader, modalMessage, ModalIconType, children }) {
  const modalRef = useRef();

  useEffect(() => {
    function handleOutsideClick(event) {
      if (isOpen && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener('click', handleOutsideClick, true);

    return () => {
      document.removeEventListener('click', handleOutsideClick, true);
    };
  }, [isOpen, onClose]);

  return (
    <div className="modal-overlay">
      <div
        className="modal-container"
        ref={modalRef}>
        <div className="modal-content">
          {modalHeader && <h2 className="modal-header">{modalHeader}</h2>}
          {ModalIconType && (
            <Lottie
              className={`modal-icon  ${MODAL_ICON_TYPES[ModalIconType]}`}
              animationData={
                ModalIconType === 'success'
                  ? success
                  : ModalIconType === 'failed'
                  ? failed
                  : ModalIconType === 'alert'
                  ? alert
                  : null
              }
              loop={false}
            />
          )}
          {modalMessage && (
            <div className="modal-message-container">
              <span className="modal-message">{modalMessage}</span>
            </div>
          )}
          <div className="modal-buttons">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
