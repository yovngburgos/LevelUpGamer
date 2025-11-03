// src/components/FeaturedProducts.jsx
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const products = [
    {
      image: '/imagenes/notebook_gamer.jpg',
      title: 'Notebook Gamer Ultra Pro',
      description: 'Ideal para los gamers más exigentes. Procesador i9, RTX 4080.',
      price: '$1.899.990',
    },
    {
      image: '/imagenes/pc_gamer.webp',
      title: 'PC Gamer Bestia RGB',
      description: 'Experimenta el gaming en 4K. Iluminación RGB personalizable.',
      price: '$2.450.000',
    },
    {
      image: '/imagenes/audifonos_gamer.webp',
      title: 'Auriculares Gamer Inmersivos',
      description: 'Sonido 7.1 envolvente y micrófono con cancelación de ruido.',
      price: '$89.990',
    },
  ];

  return (
    <section className="container py-5">
      <h2 className="text-center mb-5">Productos Destacados</h2>
      <div className="row g-4 justify-content-center">
        {products.map((p, index) => (
          <ProductCard
            key={index}
            image={p.image}
            title={p.title}
            description={p.description}
            price={p.price}
          />
        ))}
      </div>
    </section>
  );
}
