// src/components/ProductCard.jsx
const formatPrice = (price) =>
  typeof price === 'number'
    ? price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })
    : price;

export default function ProductCard({ image, title, description, price }) {
  return (
    <article className="col-md-4 col-sm-6">
      <div className="card h-100 shadow-sm product-card">
        <img src={image} className="card-img-top" alt={title} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>
          <p className="card-text text-muted flex-grow-1">{description}</p>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className="fs-5 fw-bold text-primary">{formatPrice(price)}</span>
            <button className="btn btn-primary">Añadir 🛒</button>
          </div>
        </div>
      </div>
    </article>
  );
}
