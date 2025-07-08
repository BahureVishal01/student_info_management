import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function CustomPopupModal({ show, title, message, onConfirm, onCancel, confirmText = 'OK', cancelText = 'Cancel', isConfirm = false, success }) {

  return (
    
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Body className="text-center">
        <div style={{ fontSize: '3rem', color: success ? 'green' : 'red' }}>{success ? '✅' : '❌'}</div>
        <h5 className="fw-bold mt-2">{title}</h5>
        <p>{message}</p>
        <div className="d-flex justify-content-center gap-2">
          {isConfirm && (
            <Button variant="danger" onClick={onConfirm}>
              {confirmText}
            </Button>
          )}
          <Button variant="secondary" onClick={onCancel}>
            {isConfirm ? cancelText : 'Close'}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
