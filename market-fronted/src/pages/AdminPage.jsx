import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';
import AlertModal from '../components/AlertModal';

// Formdaki kategori dropdown menüsü için seçenekleri burada tanımlayalım
const CATEGORY_OPTIONS = ["Manav", "İçecek", "Atıştırmalık", "Temel Gıda", "Temizlik","Cips","Sigara","Dondurma", "Diğer"];

function AdminPage() {
  // === STATE TANIMLAMALARI ===
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ id: null, name: '', barcode: '', price: '', category: 'Diğer', unit: 'adet' });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [searchTerm, setSearchTerm] = useState('');
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '' });

  // === VERİ ÇEKME ===
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:8080/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Ürünler çekilemedi:', error));
  };

  // === FORM FONKSİYONLARI ===
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({ id: null, name: '', barcode: '', price: '', category: 'Diğer', unit: 'adet' });
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = { ...formData, price: formData.price ? parseFloat(formData.price) : 0 };

    const request = isEditing
      ? axios.put(`http://localhost:8080/api/products/${formData.id}`, productData)
      : axios.post('http://localhost:8080/api/products', productData);

    request
      .then(() => {
        fetchProducts();
        resetForm();
        setAlertInfo({ show: true, message: isEditing ? 'Ürün başarıyla güncellendi!' : 'Ürün başarıyla eklendi!' });
      })
      .catch(error => {
        console.error('İşlem başarısız:', error);
        const errorMessage = error.response?.data?.message || error.response?.data || "Bir hata oluştu. Barkod başka bir ürüne ait olabilir.";
        setAlertInfo({ show: true, message: `Hata: ${errorMessage}` });
      });
  };

  // === TABLO AKSİYON FONKSİYONLARI ===
  const handleEdit = (product) => {
    setFormData(product);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      axios.delete(`http://localhost:8080/api/products/${id}`)
        .then(() => {
            fetchProducts();
            setAlertInfo({ show: true, message: 'Ürün başarıyla silindi.'});
        })
        .catch(error => {
            console.error('Ürün silinemedi:', error)
            setAlertInfo({ show: true, message: 'Ürün silinirken bir hata oluştu.'});
        });
    }
  };

  // === FİLTRELEME MANTIĞI ===
  const categories = ['Tümü', ...new Set(products.map(p => p.category || "Diğer"))];

  const filteredProducts = products
    .filter(product => {
      if (selectedCategory === 'Tümü') return true;
      return product.category === selectedCategory;
    })
    .filter(product => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      const nameMatch = product.name && product.name.toLowerCase().includes(term);
      const barcodeMatch = product.barcode && product.barcode.toLowerCase().includes(term);
      return nameMatch || barcodeMatch;
    });

  // === EKRANA ÇİZİLECEK JSX KODU ===
  return (
    <div className="admin-container">
      <div className="form-section">
        <h2>{isEditing ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Ürün Adı" required />
          <input type="text" name="barcode" value={formData.barcode || ''} onChange={handleInputChange} placeholder="Barkod (opsiyonel)" />
          <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Fiyat" step="0.01" required />
          
          <select name="category" value={formData.category} onChange={handleInputChange} required>
            {CATEGORY_OPTIONS.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          
          <select name="unit" value={formData.unit} onChange={handleInputChange}>
            <option value="adet">Adet</option>
            <option value="kg">KG</option>
          </select>
          <div className="form-buttons">
            <button type="submit">{isEditing ? 'Güncelle' : 'Ekle'}</button>
            {isEditing && <button type="button" onClick={resetForm}>İptal</button>}
          </div>
        </form>
      </div>

      <div className="table-section">
        <h2>Mevcut Ürünler</h2>
        <div className="filter-controls">
          <div className="category-bar">
            {categories.map(category => (
              <button key={category} className={`category-btn ${selectedCategory === category ? 'active' : ''}`} onClick={() => setSelectedCategory(category)}>
                {category}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Ürün adı veya barkoda göre ara..."
            className="admin-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Adı</th>
              <th>Barkod</th>
              <th>Fiyat</th>
              <th>Kategori</th>
              <th>Birim</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.barcode || '-'}</td>
                <td>{product.price ? product.price.toFixed(2) : '0.00'} TL</td>
                <td>{product.category}</td>
                <td>{product.unit}</td>
                <td>
                  <button onClick={() => handleEdit(product)}>Düzenle</button>
                  <button onClick={() => handleDelete(product.id)}>Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {alertInfo.show && (
        <AlertModal 
          message={alertInfo.message} 
          onClose={() => setAlertInfo({ show: false, message: '' })} 
        />
      )}
    </div>
  );
}

export default AdminPage;