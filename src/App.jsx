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
  // Carrito
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

  const addItem = (item) => setCartItems((p) => [...p, { ...item, id: item.sku }]);
  const removeItem = (item) =>
    setCartItems((prev) => prev.filter((x, i) => (item.id ? x.id !== item.id : i !== prev.indexOf(item))));
  const clearCart = () => setCartItems([]);

  const navigate = useNavigate();
  const checkout = () => navigate("/checkout");

  // Auth (para Navbar)
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      <Navbar cartCount={cartItems.length} isAuthenticated={isAuthenticated} onLogout={logout} />
      <div style={{ paddingTop: "4.5rem" }}>
        <Routes>
          <Route path="/" element={<Home onAdd={addItem} />} />
          <Route path="/catalogo" element={<Products onAdd={addItem} />} />
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
      <CartModal cartItems={cartItems} onClearCart={clearCart} onCheckout={checkout} onRemoveItem={removeItem} />
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
