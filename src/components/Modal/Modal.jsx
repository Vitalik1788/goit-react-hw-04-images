import { useEffect } from 'react';
import { Overlay, Modals } from './Modal.styled';
import { createPortal } from 'react-dom';
import { PropTypes } from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ modalData, closeModal }) => {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === 'Escape') {
        closeModal();
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  function handleBackdropClick(e) {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  }

  const { largeImageURL, tags } = modalData;
  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <Modals>
        <img src={largeImageURL} alt={tags} />
      </Modals>
    </Overlay>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
