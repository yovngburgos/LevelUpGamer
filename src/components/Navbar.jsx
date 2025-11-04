import { NavLink, Link } from 'react-router-dom';

export default function Navbar({ isAuthenticated = false, cartCount = 0, onLogout = () => {} }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Level-Up Gamer</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu"
          aria-controls="navMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/catalogo" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Productos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contacto" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Contacto</NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            {!isAuthenticated ? (
              <div id="auth-buttons" className="d-flex gap-2">
                <NavLink to="/login" className="btn btn-outline-light">Login</NavLink>
                <NavLink to="/register" className="btn btn-primary">Registrarse</NavLink>
              </div>
            ) : (
              <>
                <NavLink to="/profile" className="btn btn-primary" id="account-button">Cuenta</NavLink>
                <button className="btn btn-outline-light" type="button" onClick={onLogout}>Cerrar sesión</button>
              </>
            )}

            <button className="btn btn-outline-light position-relative" id="btnCart" aria-label="Ver carrito"
              data-bs-toggle="modal" data-bs-target="#cartModal" type="button">
              🛒 Carrito
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" id="cart-count">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
