export default function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-5">
      <div className="container">
        <p className="mb-0">
          © 2025 Level-Up Gamer. Todos los derechos reservados.
        </p>

        <div className="social-links mt-2">
          <a href="#" className="text-white mx-2" aria-label="Enlace a Facebook">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#" className="text-white mx-2" aria-label="Enlace a Twitter">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="#" className="text-white mx-2" aria-label="Enlace a Instagram">
            <i className="bi bi-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
