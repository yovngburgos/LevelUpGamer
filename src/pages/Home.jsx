import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';

export default function Home() {
  return (
    <>
      {/* Sección principal de bienvenida */}
      <Hero />

      {/* Aquí irán más secciones, como los productos destacados */}
      <div className="container py-5">
        <h2 className="text-center mb-5">Próximamente más secciones</h2>
        <p className="text-center text-muted">
          Aquí podrías poner tus productos destacados, un video de presentación, etc.
        </p>
      </div>
      <FeaturedProducts />
    </>
  );
}
