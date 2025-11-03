// src/components/CartModal.jsx
export default function CartModal({
  cartItems = [],           // [{ id?, title, price, image }]
  onClearCart = () => {},   // función para vaciar carrito
  onCheckout = () => {},    // función para finalizar compra
  onRemoveItem,             // (opcional) función para eliminar 1 ítem: (item) => void
}) {
  const hasItems = cartItems.length > 0;

  // Convierte price a número (soporta "$1.234.567" o 1234567)
  const toNumber = (p) =>
    typeof p === 'number' ? p : Number(String(p).replace(/[^\d]/g, '') || 0);

  const total = cartItems.reduce((sum, item) => sum + toNumber(item.price), 0);

  const formatCLP = (n) =>
    (Number(n) || 0).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });

  return (
    <div
      className="modal fade"
      id="cartModal"
      tabIndex="-1"
      aria-labelledby="cartModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title" id="cartModalLabel">Carrito de Compras</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>

          {/* Body */}
          <div className="modal-body" id="cart-items">
            {hasItems ? (
              <>
                {cartItems.map((item, idx) => (
                  <div
                    key={item.id ?? idx}
                    className="cart-item d-flex align-items-center justify-content-between mb-3"
                  >
                    <div className="d-flex align-items-center">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="cart-item-img me-3"
                        />
                      )}
                      <div>
                        <h6 className="mb-1">{item.title}</h6>
                        <small className="text-muted">
                          {typeof item.price === 'number' ? formatCLP(item.price) : item.price}
                        </small>
                        {/* (opcional) color, sku, etc. */}
                        {item.color && (
                          <div className="product-color-pill mt-1">Color: {item.color}</div>
                        )}
                      </div>
                    </div>

                    {typeof onRemoveItem === 'function' && (
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => onRemoveItem(item)}
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                ))}

                {/* Total */}
                <div className="d-flex justify-content-end mt-3">
                  <div className="text-end">
                    <div className="fw-semibold">Total</div>
                    <div className="fs-5 text-primary">{formatCLP(total)}</div>
                  </div>
                </div>
              </>
            ) : (
              <p>No hay productos en el carrito.</p>
            )}
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClearCart}
              disabled={!hasItems}
            >
              Vaciar
            </button>

            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={onCheckout}
              disabled={!hasItems}
            >
              Finalizar compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
