// Importo el componente ProductCard, que se encarga de mostrar cada producto individual
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

export default function FeaturedProducts({ onAdd }) {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Llamamos al backend para obtener SOLO los productos destacados
    fetch("http://localhost:8080/featuredproducts")
      .then((res) => res.json())
      .then((data) => {
        setFeaturedProducts(data);
      })
      .catch((err) => {
        console.error("Error al cargar productos destacados:", err);
      });
  }, []);

  return (
    <section className="container py-5">
      {/* Título de la sección */}
      <h2 className="text-center mb-5" style={{ color: "#f7f5f8ff" }}>
        Productos Destacados
      </h2>

      {/* Contenedor con Bootstrap para organizar los productos en filas y columnas */}
      <div className="row g-4 justify-content-center">
        {featuredProducts.map((p) => {
          // Armamos la URL completa de la imagen
          const imageUrl = p.imageUrl?.startsWith("http")
            ? p.imageUrl
            : `http://localhost:8080/images/${p.imageUrl}`;

          // Normalizamos el objeto que usaremos en la card y en el carrito
          const productForUI = {
            id: p.id,
            title: p.name,
            description: p.description,
            price: p.price,
            image: imageUrl,
          };

          return (
            <ProductCard
              key={productForUI.id}
              {...productForUI}
              onAdd={() => onAdd?.(productForUI)}
            />
          );
        })}
      </div>
    </section>
  );
}
