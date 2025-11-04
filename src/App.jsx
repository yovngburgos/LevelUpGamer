// src/App.jsx
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { AuthProvider, useAuth } from "./context/authContext";
import RequireAuth from "./components/RequireAuth";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import OrderSummary from "./pages/OrderSummary";

import Footer from "./components/Footer";
import CartModal from "./components/CartModal";

function AppRoutes() {
  // 🛒 Estado del carrito (con persistencia)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cartItems");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ➕ Agregar (si existe, incrementa qty)
  const addItem = (item) => {
    setCartItems((prev) => {
      const id = item.sku || item.id;
      const idx = prev.findIndex((p) => p.id === id);
      if (idx !== -1) {
        return prev.map((p, i) =>
          i === idx ? { ...p, qty: (p.qty || 1) + 1 } : p
        );
      }
      return [...prev, { ...item, id, qty: 1 }];
    });
  };

  // ➕ Incrementar cantidad
  const incItem = (item) => {
    setCartItems((prev) =>
      prev.map((p) =>
        p.id === item.id ? { ...p, qty: (p.qty || 1) + 1 } : p
      )
    );
  };

  // ➖ Decrementar cantidad (si queda en 0, elimina la línea)
  const decItem = (item) => {
    setCartItems((prev) =>
      prev.flatMap((p) => {
        if (p.id !== item.id) return [p];
        const nextQty = (p.qty || 1) - 1;
        return nextQty > 0 ? [{ ...p, qty: nextQty }] : [];
      })
    );
  };

  // 🗑️ Eliminar la línea completa
  const removeLine = (item) => {
    setCartItems((prev) => prev.filter((p) => p.id !== item.id));
  };

  // 🧹 Vaciar carrito
  const clearCart = () => setCartItems([]);

  // 💳 Navegar a checkout
  const navigate = useNavigate();
  const checkout = () => navigate("/checkout");

  // 🔐 Auth (Navbar)
  const { isAuthenticated, logout } = useAuth();

  // Contador en navbar = suma de qty (no número de líneas)
  const cartCount = cartItems.reduce((acc, it) => acc + (it.qty || 1), 0);

  return (
    <>
      <Navbar cartCount={cartCount} isAuthenticated={isAuthenticated} onLogout={logout} />

      <div style={{ paddingTop: "4.5rem" }}>
        <Routes>
          <Route path="/" element={<Home onAdd={addItem} />} />
          <Route path="/productos" element={<Products onAdd={addItem} />} />

          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />

          <Route
            path="/checkout"
            element={<Checkout cartItems={cartItems} onFinalize={() => clearCart()} />}
          />
          <Route path="/order-summary" element={<OrderSummary />} />
        </Routes>
      </div>

      <Footer />

      {/* Modal del carrito con controles de cantidad */}
      <CartModal
        cartItems={cartItems}
        onClearCart={clearCart}
        onCheckout={checkout}
        onIncItem={incItem}
        onDecItem={decItem}
        onRemoveLine={removeLine}
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
