import products from '../data/products.jsx';
import ProductCard from '../components/ProductCard';

export default function Productos() {
  return (
    <section className="container py-5">
      <header className="text-center mb-5">
        <h1 className="mb-3">Catálogo de Productos</h1>
        <p className="text-muted">
          Explora nuestra selección gamer y encuentra el equipo perfecto para tu próxima partida.
        </p>
      </header>

      <div className="row g-4 justify-content-center">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.title}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
}
