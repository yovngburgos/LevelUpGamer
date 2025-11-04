export default function Profile() {
  return (
    <>
      <header className="bg-primary text-white text-center py-5 mt-5">
        <div className="container pt-5">
          <h1 className="display-4">Mi Cuenta</h1>
          <p className="lead">Aquí puedes ver y gestionar la información de tu perfil.</p>
        </div>
      </header>

      <main className="container py-5">
        <div className="card shadow-lg">
          <div className="card-body">
            <h4 className="card-title text-center mb-4">Información del Usuario</h4>
            <p><strong>Nombre:</strong> <span>Usuario Demo</span></p>
            <p><strong>Correo:</strong> <span>demo@demo.com</span></p>
            <p><strong>Teléfono:</strong> <span>+56 9 1234 5678</span></p>
            <div className="d-flex justify-content-center mt-4 gap-2">
              <button className="btn btn-warning">Editar perfil</button>
              <button className="btn btn-danger">Cerrar sesión</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
