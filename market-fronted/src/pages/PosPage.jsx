import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../App.css';
import WeightModal from '../WeightModal';
import PaymentModal from '../PaymentModal';
import AlertModal from '../components/AlertModal';

function PosPage() {
    // === STATE TANIMLAMALARI ===
    const [products, setProducts] =useState([]);
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('Tümü');
    const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '' });
    const searchInputRef = useRef(null);

    // === VERİ ÇEKME ===
    useEffect(() => {
        axios.get('http://localhost:8080/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('API isteği sırasında hata oluştu!', error);
                setAlertInfo({ show: true, message: 'Ürünler sunucudan çekilemedi. Backend çalışıyor mu?' });
            });
    }, []);

    // === SEPET VE MODAL FONKSİYONLARI ===
    const handleAddToCart = (productToAdd) => {
        if (!productToAdd || !productToAdd.unit) {
            console.error("Geçersiz ürün sepete eklenemez:", productToAdd);
            return;
        }

        if (productToAdd.unit === 'kg') {
            setSelectedProduct(productToAdd);
            setIsWeightModalOpen(true);
        } else {
            const existingItem = cart.find(item => item.id === productToAdd.id);
            if (existingItem) {
                const updatedCart = cart.map(item =>
                    item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
                );
                setCart(updatedCart);
            } else {
                setCart([...cart, { ...productToAdd, quantity: 1 }]);
            }
        }
    };

    const handleModalSubmit = (weight) => {
        if (selectedProduct) {
            // Aynı kg ürün sepette varsa miktarını artır
            const existingItem = cart.find(item => item.id === selectedProduct.id && item.unit === 'kg');
            if (existingItem) {
                const updatedCart = cart.map(item =>
                    item.id === selectedProduct.id && item.unit === 'kg'
                        ? { 
                            ...item, 
                            quantity: item.quantity + weight, 
                            totalItemPrice: item.price * (item.quantity + weight) 
                        }
                        : item
                );
                setCart(updatedCart);
            } else {
                const newItem = { ...selectedProduct, quantity: weight, totalItemPrice: selectedProduct.price * weight };
                setCart([...cart, newItem]);
            }
            closeWeightModal();
        }
    };

    const closeWeightModal = () => {
        setIsWeightModalOpen(false);
        setSelectedProduct(null);
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    const handleOpenPaymentModal = () => { if (cart.length > 0) setIsPaymentModalOpen(true); };

    const handlePaymentComplete = () => {
        if (cart.length === 0) return;
        const cartDto = { cart: cart, totalPrice: totalPrice };
        axios.post('http://localhost:8080/api/sales/checkout', cartDto)
            .then(response => {
                setIsPaymentModalOpen(false);
                setCart([]);
                setAlertInfo({ show: true, message: 'Satış başarıyla tamamlandı!' });
            })
            .catch(error => {
                setIsPaymentModalOpen(false);
                setAlertInfo({ show: true, message: 'Satış kaydedilemedi! Lütfen tekrar deneyin.' });
            });
    };

    const handleRemoveItem = (itemToRemove) => setCart(cart.filter(item => item.id !== itemToRemove.id));
    
    const handleIncreaseQuantity = (itemToIncrease) => setCart(cart.map(item => item.id === itemToIncrease.id ? { ...item, quantity: item.quantity + 1 } : item));
    
    const handleDecreaseQuantity = (itemToDecrease) => {
        const existingItem = cart.find(item => item.id === itemToDecrease.id);
        if (existingItem && existingItem.quantity === 1) {
            handleRemoveItem(itemToDecrease);
        } else {
            setCart(cart.map(item => item.id === itemToDecrease.id ? { ...item, quantity: item.quantity - 1 } : item));
        }
    };

    const handleClearCart = () => setCart([]);

    const handleBarcodeScan = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (!searchTerm.trim()) return;
            axios.get(`http://localhost:8080/api/products/barcode/${searchTerm.trim()}`)
                .then(response => {
                    if (response.data) {
                        handleAddToCart(response.data);
                        setSearchTerm('');
                    } else {
                        setAlertInfo({ show: true, message: 'Bu barkoda sahip bir ürün bulunamadı!' });
                        setSearchTerm('');
                    }
                })
                .catch(error => {
                    setAlertInfo({ show: true, message: 'Bu barkoda sahip bir ürün bulunamadı!' });
                    setSearchTerm('');
                })
                .finally(() => {
                    if (searchInputRef.current) {
                        searchInputRef.current.focus();
                    }
                });
        }
    };

    // === HESAPLAMALAR VE FİLTRELEME ===
    useEffect(() => {
        const total = cart.reduce((sum, item) => {
            const itemPrice = item.totalItemPrice ? item.totalItemPrice : (item.price || 0) * (item.quantity || 0);
            return sum + itemPrice;
        }, 0);
        setTotalPrice(total);
    }, [cart]);

    const categories = ['Tümü', ...new Set(products.map(p => p.category || 'Diğer'))];

    const filteredProducts = products
        .filter(product => {
            if (selectedCategory === 'Tümü') return true;
            return product.category === selectedCategory;
        })
        .filter(product => {
            if (!product.name) return false;
            return product.name.toLowerCase().includes(searchTerm.toLowerCase());
        });

    // === EKRANA ÇİZİLECEK JSX KODU ===
    return (
        <div className="app-container">
            <div className="product-panel">
                <h1>Ürünler</h1>
                <div className="category-bar">
                    {categories.map(category => (
                        <button key={category} className={`category-btn ${selectedCategory === category ? 'active' : ''}`} onClick={() => setSelectedCategory(category)}>
                            {category}
                        </button>
                    ))}
                </div>
                <div className="product-grid">
                    {filteredProducts.map(product => (
                        <button key={product.id} className="product-button" onClick={() => handleAddToCart(product)}>
                            {product.name}<br /><small>{(product.price || 0).toFixed(2)} TL {product.unit === 'kg' ? '/ kg' : ''}</small>
                        </button>
                    ))}
                </div>
            </div>

            <div className="search-panel">
                <h2>Arama / Barkod</h2>
                <input 
                  ref={searchInputRef}
                  type="text"
                  className="search-input"
                  placeholder="Ürün adı veya barkod okutun..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleBarcodeScan}
                  autoFocus
                />
            </div>

            <div className="cart-panel">
                <h2>Sepet</h2>
                {cart.length === 0 ? <p>Sepetiniz boş.</p> : (
                    <div className="cart-items">
                        <ul>
                            {cart.map((item, index) => (
                                <li key={index}>
                                    <span className="cart-item-name">{item.name}</span>
                                    <div className="cart-item-controls">
                                        {item.unit !== 'kg' ? (
                                            <>
                                                <button className="control-btn" onClick={() => handleDecreaseQuantity(item)}>-</button>
                                                <span>{item.quantity}</span>
                                                <button className="control-btn" onClick={() => handleIncreaseQuantity(item)}>+</button>
                                            </>
                                        ) : (<span>{item.quantity} kg</span>)}
                                        <button className="control-btn remove-btn" onClick={() => handleRemoveItem(item)}>X</button>
                                    </div>
                                    <span className="cart-item-price">{(item.totalItemPrice || (item.price || 0) * (item.quantity || 0)).toFixed(2)} TL</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <hr />
                <h2>Toplam: {totalPrice.toFixed(2)} TL</h2>
                <div className="cart-actions">
                    <button className="action-btn clear-btn" onClick={handleClearCart}>Sepeti Temizle</button>
                    <button className="action-btn checkout-btn" onClick={handleOpenPaymentModal}>ÖDEME AL</button>
                </div>
            </div>

            {isWeightModalOpen && ( <WeightModal product={selectedProduct} onClose={closeWeightModal} onSubmit={handleModalSubmit} /> )}
            {isPaymentModalOpen && ( <PaymentModal total={totalPrice} onClose={() => setIsPaymentModalOpen(false)} onPaymentComplete={handlePaymentComplete} /> )}
            {alertInfo.show && (
              <AlertModal 
                message={alertInfo.message} 
                onClose={() => setAlertInfo({ show: false, message: '' })} 
              />
            )}
        </div>
    );
}

export default PosPage;