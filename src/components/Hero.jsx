import { NavLink } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero-section bg-dark text-white text-center py-5 d-flex align-items-center justify-content-center pt-5">
      <div className="container mt-5">
        <h1 className="display-4 mb-3 animate__animated animate__fadeInDown">
          Bienvenido a Level-Up Gamer
        </h1>

        <p className="lead mb-4 animate__animated animate__fadeInUp">
          Tu tienda gamer de confianza: notebooks, PCs, accesorios y más.
        </p>

        <NavLink
          to="/catalogo"
          className="btn btn-primary btn-lg mt-3 animate__animated animate__zoomIn"
        >
          Explorar Productos
        </NavLink>
      </div>
    </section>
  );
}
