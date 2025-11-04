// src/pages/Home.jsx
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";

export default function Home({ onAdd }) {
  return (
    <>
      {/* Sección principal de bienvenida */}
      <Hero />

      {/* Sección de productos destacados */}
      <FeaturedProducts onAdd={onAdd} />

      {/* Espacio para futuras secciones */}
      <div className="container py-5">
        <h2 className="text-center mb-5">Próximamente más secciones</h2>
        <p className="text-center text-muted">
          Aquí podrías poner tus productos destacados, un video de presentación, etc.
        </p>
      </div>
    </>
  );
}
