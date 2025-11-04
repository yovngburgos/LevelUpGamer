import { useNavigate } from "react-router-dom";

export default function Checkout({ cartItems = [], onFinalize }) {
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías validar, enviar datos, etc.
    onFinalize?.();            // limpia carrito si quieres
    navigate("/order-summary", { state: { items: cartItems } });
  };

  return (
    <>
      <header className="bg-primary text-white text-center py-5 mt-5">
        <div className="container pt-5">
          <h1 className="display-4">Finalizar tu Compra</h1>
          <p className="lead">Completa tus datos para procesar tu pedido.</p>
        </div>
      </header>

      <main className="container py-5">
        <section>
          <h2 className="text-center mb-4">Detalles de Envío y Pago</h2>
          <form className="row g-3" onSubmit={onSubmit}>
            <div className="col-md-6">
              <label className="form-label">Nombre Completo</label>
              <input className="form-control" required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Correo Electrónico</label>
              <input type="email" className="form-control" required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Teléfono</label>
              <input className="form-control" required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Dirección de Envío</label>
              <input className="form-control" required />
            </div>
            <div className="col-md-12">
              <label className="form-label">Método de Pago</label>
              <select className="form-select" required>
                <option value="">Selecciona…</option>
                <option value="debito">Débito</option>
                <option value="credito">Crédito</option>
                <option value="transferencia">Transferencia</option>
              </select>
            </div>
            <div className="col-12">
              <button className="btn btn-primary" type="submit">Finalizar Pedido</button>
              <button className="btn btn-secondary ms-2" type="reset">Limpiar</button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
