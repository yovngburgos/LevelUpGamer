import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", tel: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    try {
      await register({ name: form.name.trim(), email: form.email.trim(), tel: form.tel.trim(), password: form.password });
      navigate("/profile", { replace: true });
    } catch (err) {
      setError(err?.message || "Error al registrar.");
    }
  };

  return (
    <main className="container py-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Crear Cuenta</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre completo</label>
                  <input className="form-control" name="name" value={form.name} onChange={onChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Correo</label>
                  <input type="email" className="form-control" name="email" value={form.email} onChange={onChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Teléfono</label>
                  <input className="form-control" name="tel" value={form.tel} onChange={onChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input type="password" className="form-control" name="password" value={form.password} onChange={onChange} minLength={6} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirmar contraseña</label>
                  <input type="password" className="form-control" name="confirm" value={form.confirm} onChange={onChange} required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Registrarse</button>
              </form>
              <p className="mt-3 text-center">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
