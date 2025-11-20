import Modal from 'react-modal';
import { ReactNode } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

Modal.setAppElement('#root');

function Popup({ isOpen, onClose, children }: ModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose} 
      overlayClassName="popup__overlay" 
      className="popup__content" 
    >
      {children}
    </Modal>
  );
}

export default Popup;