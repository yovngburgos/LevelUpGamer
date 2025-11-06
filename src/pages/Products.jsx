// src/pages/Products.jsx
import ProductCard from "../components/ProductCard";
import pc_Gamer from "../imagenes/pc_gamer.webp";
import notebook_gamer from "../imagenes/notebook_gamer.jpg";
import gamer_auriculares from "../imagenes/gamer_auriculares.jpg";
import mouse_gamer from "../imagenes/mouse_gamer.jpg";
import teclado_gamer from "../imagenes/teclado_gamer.webp";
import silla_gamer from "../imagenes/silla_gamer.webp";

const PRODUCTS = [
  {
    title: "Notebook Gamer Ultra Pro",
    price: 1899990,
    sku: "NOTEBOOK001",
    color: "Negro",
    image: notebook_gamer,
    description: "Procesador i9, RTX 4080, 32GB RAM."
  },
  {
    title: "PC Gamer Bestia RGB",
    price: 2450000,
    sku: "PCGAMER002",
    color: "Negro",
    image: pc_Gamer,
    description: "Gaming en 4K con iluminación RGB personalizable."
  },
  {
    title: "Auriculares Gamer Inmersivos",
    price: 89990,
    sku: "HEADSET003",
    color: "Negro",
    image: gamer_auriculares,
    description: "Sonido 7.1 envolvente y cancelación de ruido."
  },
  {
    title: "Mouse Gamer Pro",
    price: 39990,
    sku: "MOUSE004",
    color: "Negro",
    image: mouse_gamer,
    description: "Sensor óptico 16.000 DPI con RGB."
  },
  {
    title: "Teclado Mecánico RGB",
    price: 79990,
    sku: "TECLADO005",
    color: "Negro",
    image: teclado_gamer,
    description: "Switches mecánicos + retroiluminación personalizable."
  },
  {
    title: "Silla Gamer Premium",
    price: 199990,
    sku: "SILLA006",
    color: "Negro",
    image: silla_gamer,
    description: "Ergonómica, reclinable, con soporte lumbar."
  }
];

export default function Products({ onAdd }) {
  return (
    <>
      <header className="bg-dark text-white text-center py-5 mt-5">
        <div className="container pt-5">
          <h1 className="display-4">Nuestros Productos</h1>
          <p className="lead">Descubre la mejor tecnología gamer al mejor precio</p>
        </div>
      </header>

      <main className="container py-5">
        <div className="row">
          {PRODUCTS.map((p) => (
            <ProductCard
              key={p.sku}
              image={p.image}
              title={p.title}
              description={p.description}
              price={p.price}
              color={p.color}
              onAdd={() => onAdd?.(p)}
            />
          ))}
        </div>
      </main>
    </>
  );
}
