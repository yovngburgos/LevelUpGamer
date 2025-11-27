// Importo el componente ProductCard, que representa cada tarjeta de producto
import ProductCard from "../components/ProductCard";

// Hooks de React
import { useEffect, useState } from "react";

export default function Products({ onAdd }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <header className="bg-dark text-white text-center py-5 mt-5">
        <div className="container pt-5">
          <h1 className="display-4">Nuestros Productos</h1>
          <p className="lead">
            Descubre la mejor tecnología gamer al mejor precio
          </p>
        </div>
      </header>

      <main className="container py-5">
        <div className="row">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              title={p.name}
              description={p.description}
              price={p.price}
              // 👇 usa el campo que devuelve el backend
              image={`http://localhost:8080/images/${p.imageUrl}`}
              onAdd={() => onAdd?.(p)}
            />
          ))}
        </div>
      </main>
    </>
  );
}
