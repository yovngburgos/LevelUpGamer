export default function Register() {
  const onSubmit = (e) => {
    e.preventDefault();
    alert("Registro simulado ✅");
  };

  return (
    <main className="container py-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Crear Cuenta</h3>
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre completo</label>
                  <input className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Correo</label>
                  <input type="email" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Teléfono</label>
                  <input className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input type="password" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirmar contraseña</label>
                  <input type="password" className="form-control" required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Registrarse</button>
              </form>
              <p className="mt-3 text-center">¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
