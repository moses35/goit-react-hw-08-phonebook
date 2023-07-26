import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from 'components/Modal/Modal.styled';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { UpdateForm } from 'components/UpdateForm/UpdateFrom';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ id, contactName, contactNumber, closeModal }) => {
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  useEffect(() => {
    const handaleKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handaleKeyDown);

    return () => {
      window.removeEventListener('keydown', handaleKeyDown);
    };
  }, [closeModal]);

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>
        <UpdateForm
          id={id}
          contactName={contactName}
          contactNumber={contactNumber}
          closeModal={closeModal}
        />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  contactName: PropTypes.string.isRequired,
  contactNumber: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
