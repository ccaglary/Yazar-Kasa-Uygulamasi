import React, { useState, useEffect } from 'react';

function PaymentModal({ total, onClose, onPaymentComplete }) {
  const [amountReceived, setAmountReceived] = useState('');
  const [change, setChange] = useState(0);

  // Alınan para miktarı her değiştiğinde para üstünü hesapla
  useEffect(() => {
    const received = parseFloat(amountReceived);
    if (!isNaN(received) && received >= total) {
      setChange(received - total);
    } else {
      setChange(0);
    }
  }, [amountReceived, total]);

  const handlePayment = () => {
    onPaymentComplete(); // Ödeme tamamlandı fonksiyonunu çağır
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Ödeme Ekranı</h2>
        <h3>Toplam Tutar: <span className="payment-total">{total.toFixed(2)} TL</span></h3>

        <label htmlFor="amount">Alınan Nakit</label>
        <input
          id="amount"
          type="number"
          className="weight-input"
          value={amountReceived}
          onChange={(e) => setAmountReceived(e.target.value)}
          placeholder="0.00"
          autoFocus
        />

        <h2>Para Üstü: <span className="payment-change">{change.toFixed(2)} TL</span></h2>

        <div className="modal-buttons">
          <button onClick={onClose} className="modal-btn cancel-btn">İptal</button>
          <button onClick={handlePayment} className="modal-btn submit-btn" disabled={parseFloat(amountReceived) < total}>
            Satışı Tamamla
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;