import { useState } from "react";
import { useAuth } from "../context/authContext";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name ?? "", tel: user?.tel ?? "" });

  const onSubmit = (e) => {
    e.preventDefault();
    updateProfile({ name: form.name.trim(), tel: form.tel.trim() });
    setEditing(false);
  };

  return (
    <>
      <header className="bg-primary text-white text-center py-5 mt-5">
        <div className="container pt-5">
          <h1 className="display-4">Mi Cuenta</h1>
          <p className="lead">Gestiona la información de tu perfil.</p>
        </div>
      </header>

      <main className="container py-5">
        <div className="card shadow-lg">
          <div className="card-body">
            <h4 className="card-title text-center mb-4">Información del Usuario</h4>

            {!editing ? (
              <>
                <p><strong>Nombre:</strong> <span>{user?.name}</span></p>
                <p><strong>Correo:</strong> <span>{user?.email}</span></p>
                <p><strong>Teléfono:</strong> <span>{user?.tel}</span></p>
                <div className="d-flex justify-content-center mt-4 gap-2">
                  <button className="btn btn-warning" onClick={() => setEditing(true)}>Editar perfil</button>
                </div>
              </>
            ) : (
              <form className="mt-3" onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre completo</label>
                  <input className="form-control" value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Teléfono</label>
                  <input className="form-control" value={form.tel} onChange={(e)=>setForm({...form, tel: e.target.value})} required />
                </div>
                <div className="d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-secondary" onClick={()=>setEditing(false)}>Cancelar</button>
                  <button type="submit" className="btn btn-success">Guardar cambios</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
