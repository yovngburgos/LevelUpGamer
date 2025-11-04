import { useState } from "react";

export default function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });

  const onChange = (e) => {
    const { id, value } = e.target;
    setForm((f) => ({ ...f, [id]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Valida básico y simula envío
    alert("Mensaje enviado ✅");
  };

  return (
    <>
      <header className="bg-dark text-white text-center py-5 mt-5">
        <div className="container pt-5">
          <h1 className="display-4">Contáctanos</h1>
          <p className="lead">Envíanos un mensaje y te responderemos a la brevedad.</p>
        </div>
      </header>

      <main className="container py-5">
        <section>
          <h2 className="text-center mb-4">Envíanos un Mensaje</h2>
          <form className="row g-3" onSubmit={onSubmit}>
            <div className="col-md-6">
              <label htmlFor="contact-nombre" className="form-label">Nombre</label>
              <input id="contact-nombre" className="form-control" value={form["contact-nombre"]} onChange={(e)=>setForm({...form,["contact-nombre"]:e.target.value})} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="contact-email" className="form-label">Correo</label>
              <input id="contact-email" type="email" className="form-control" value={form["contact-email"]} onChange={(e)=>setForm({...form,["contact-email"]:e.target.value})} required />
            </div>
            <div className="col-12">
              <label htmlFor="contact-comentarios" className="form-label">Mensaje</label>
              <textarea id="contact-comentarios" className="form-control" rows="5" value={form["contact-comentarios"]} onChange={(e)=>setForm({...form,["contact-comentarios"]:e.target.value})} required />
            </div>
            <div className="col-12">
              <button className="btn btn-primary" type="submit">Enviar Mensaje</button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
