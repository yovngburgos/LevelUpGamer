import ProductCard from "./ProductCard";

const FEATURED = [
  {
    title: "Notebook Gamer Ultra Pro",
    price: 1899990,
    sku: "NOTEBOOK001",
    color: "Negro",
    image: "/imagenes/notebook_gamer.jpg",
    description: "Ideal para los gamers más exigentes. Procesador i9, RTX 4080."
  },
  {
    title: "PC Gamer Bestia RGB",
    price: 2450000,
    sku: "PCGAMER002",
    color: "Negro",
    image: "/imagenes/pc_gamer.webp",
    description: "Experiencia gaming en 4K con iluminación RGB personalizable."
  },
  {
    title: "Auriculares Gamer Inmersivos",
    price: 89990,
    sku: "HEADSET003",
    color: "Negro",
    image: "/imagenes/audifonos_gamer.webp",
    description: "Sonido 7.1 envolvente y cancelación de ruido."
  }
];

export default function FeaturedProducts({ onAdd }) {
  return (
    <section className="container py-5">
      <h2 className="text-center mb-5">Productos Destacados</h2>
      <div className="row g-4 justify-content-center">
        {FEATURED.map((p) => (
          <ProductCard key={p.sku} {...p} onAdd={() => onAdd?.(p)} />
        ))}
      </div>
    </section>
  );
}
