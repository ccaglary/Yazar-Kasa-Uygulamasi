import React, { useState } from 'react';

function WeightModal({ product, onClose, onSubmit }) {
  // Input'un değerini string olarak tutmak, "1." gibi ara değerlere izin verir
  const [weight, setWeight] = useState('1'); 

  const handleSubmit = () => {
    const numericWeight = parseFloat(weight);
    if (!isNaN(numericWeight) && numericWeight > 0) {
      onSubmit(numericWeight);
    }
  };

  // <-- YENİ FONKSİYON ---
  // Kısayol butonuna basıldığında input'u güncelleyen fonksiyon
  const setPresetWeight = (preset) => {
    setWeight(preset.toString());
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{product.name} - Ağırlık Girin (kg)</h2>
        
        {/* --- YENİ KISAYOL BUTONLARI --- */}
        <div className="preset-weights">
          <button className="preset-btn" onClick={() => setPresetWeight(0.5)}>500 gr</button>
          <button className="preset-btn" onClick={() => setPresetWeight(1)}>1 kg</button>
          <button className="preset-btn" onClick={() => setPresetWeight(1.5)}>1.5 kg</button>
        </div>

        <input
          type="number"
          className="weight-input"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          autoFocus
        />
        <div className="modal-buttons">
          <button onClick={onClose} className="modal-btn cancel-btn">Vazgeç</button>
          <button onClick={handleSubmit} className="modal-btn submit-btn">Ekle</button>
        </div>
      </div>
    </div>
  );
}

export default WeightModal;