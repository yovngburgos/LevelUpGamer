// Importo useNavigate desde react-router-dom.
// Este hook me permite redirigir al usuario a otra ruta después de finalizar la compra.
import { useNavigate } from "react-router-dom";

// Defino el componente Checkout.
// Recibe como props:
// - cartItems: los productos que están en el carrito.
// - onFinalize: función que se ejecuta al terminar la compra (por ejemplo, limpiar el carrito).
export default function Checkout({ cartItems = [], onFinalize }) {
  const navigate = useNavigate();

  // Función que se ejecuta al enviar el formulario
  const onSubmit = (e) => {
    e.preventDefault(); // Evito que la página se recargue
    // Aquí podría agregar validaciones o enviar los datos a un backend
    onFinalize?.(); // Limpio el carrito si corresponde
    // Redirijo al usuario a la página de resumen de pedido, pasando los items como estado
    navigate("/order-summary", { state: { items: cartItems } });
  };

  return (
    <>
      {/* Encabezado de la página con título y subtítulo */}
      <header className="bg-primary text-white text-center py-5 mt-5">
        <div className="container pt-5">
          <h1 className="display-4">Finalizar tu Compra</h1>
          <p className="lead">Completa tus datos para procesar tu pedido.</p>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container py-5">
        <section>
          <h2 className="text-center mb-4">Detalles de Envío y Pago</h2>
          
          {/* Formulario de datos del cliente */}
          <form className="row g-3" onSubmit={onSubmit}>
            {/* Nombre completo */}
            <div className="col-md-6">
              <label className="form-label">Nombre Completo</label>
              <input className="form-control" required />
            </div>

            {/* Correo electrónico */}
            <div className="col-md-6">
              <label className="form-label">Correo Electrónico</label>
              <input type="email" className="form-control" required />
            </div>

            {/* Teléfono */}
            <div className="col-md-6">
              <label className="form-label">Teléfono</label>
              <input className="form-control" required />
            </div>

            {/* Dirección de envío */}
            <div className="col-md-6">
              <label className="form-label">Dirección de Envío</label>
              <input className="form-control" required />
            </div>

            {/* Método de pago */}
            <div className="col-md-12">
              <label className="form-label">Método de Pago</label>
              <select className="form-select" required>
                <option value="">Selecciona…</option>
                <option value="debito">Débito</option>
                <option value="credito">Crédito</option>
                <option value="transferencia">Transferencia</option>
              </select>
            </div>

            {/* Botones de acción */}
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