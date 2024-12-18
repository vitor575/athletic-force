import React, { FC } from 'react';

interface BootstrapModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'lg' | 'xl'; // Adicionando prop de tamanho
}

const BootstrapModal: FC<BootstrapModalProps> = ({ isOpen, onClose, title, children, size }) => {
  return (
    <div
      className={`modal fade ${isOpen ? 'show d-block' : ''}`}
      tabIndex={-1}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      role="dialog"
    >
      <div className={`modal-dialog ${size ? `modal-${size}` : ''}`} role="document"> {/* Aqui */}
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default BootstrapModal;
