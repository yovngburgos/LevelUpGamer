// src/App.jsx
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Footer from './components/Footer';
import CartModal from './components/CartModal';

export default function App() {
  // 🛒 Estado global del carrito
  const [cartItems, setCartItems] = useState([]);

  // 🧹 Vaciar carrito
  const clearCart = () => setCartItems([]);

  // 💳 Finalizar compra (simulación)
  const checkout = () => {
    alert('Compra finalizada correctamente 🛍️');
    setCartItems([]); // limpia el carrito tras comprar
  };

  // ❌ Eliminar producto individual
  const removeItem = (item) => {
    setCartItems((prev) =>
      prev.filter((x, i) => (item.id ? x.id !== item.id : i !== prev.indexOf(item)))
    );
  };

  return (
    <BrowserRouter>
      {/* Navbar fijo arriba */}
      <Navbar cartCount={cartItems.length} />

      {/* Contenido principal con padding para el navbar */}
      <div style={{ paddingTop: '4.5rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
        </Routes>
      </div>

      {/* Footer global */}
      <Footer />

      {/* Modal global del carrito: recibe props y funciones */}
      <CartModal
        cartItems={cartItems}
        onClearCart={clearCart}
        onCheckout={checkout}
        onRemoveItem={removeItem}
      />
    </BrowserRouter>
  );
}
