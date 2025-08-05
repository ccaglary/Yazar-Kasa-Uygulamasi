import React from 'react';

// Bu component sadece gösterilecek mesajı ve kapanma fonksiyonunu alır
function AlertModal({ message, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content alert-modal">
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onClose} className="modal-btn submit-btn">Tamam</button>
        </div>
      </div>
    </div>
  );
}

export default AlertModal;