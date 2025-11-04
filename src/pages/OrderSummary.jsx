import { useLocation, Link } from "react-router-dom";

const formatCLP = (n) =>
  (Number(n) || 0).toLocaleString("es-CL", { style: "currency", currency: "CLP" });

export default function OrderSummary() {
  const { state } = useLocation();
  const items = state?.items ?? [];
  const total = items.reduce((acc, it) => acc + (typeof it.price === "number" ? it.price : Number(String(it.price).replace(/[^\d]/g,'')) || 0), 0);

  return (
    <>
      <header className="bg-success text-white text-center py-5 mt-5">
        <div className="container pt-5">
          <h1 className="display-4">¡Compra Finalizada!</h1>
          <p className="lead">Gracias por tu compra. Aquí tienes el resumen.</p>
        </div>
      </header>

      <main className="container py-5">
        <div className="card shadow-lg">
          <div className="card-body">
            <h4 className="card-title mb-4">Resumen del Pedido</h4>
            <div className="mb-4">
              {items.length === 0 ? (
                <p>No se encontraron ítems del pedido.</p>
              ) : (
                <ul className="list-group">
                  {items.map((it) => (
                    <li key={it.sku} className="list-group-item d-flex justify-content-between align-items-center">
                      <span>{it.title}</span>
                      <strong>{formatCLP(it.price)}</strong>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="d-flex justify-content-between align-items-center mb-4 border-top pt-3">
              <h5>Total del Pedido:</h5>
              <h5 className="text-success">{formatCLP(total)}</h5>
            </div>
            <Link to="/" className="btn btn-primary w-100">Volver a la página principal</Link>
          </div>
        </div>
      </main>
    </>
  );
}
