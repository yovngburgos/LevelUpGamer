import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../Navbar";
import { AuthProvider } from "../../context/authContext"; // ✅ usar el provider real

// Función auxiliar para renderizar el Navbar con router y provider
const renderWithProviders = (ui) => {
  return render(
    <MemoryRouter>
      <AuthProvider>{ui}</AuthProvider>
    </MemoryRouter>
  );
};

describe("Navbar", () => {
  it("muestra el contador del carrito", () => {
    renderWithProviders(<Navbar cartCount={5} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("muestra Login/Registrarse si no está autenticado", () => {
    // Como no hay usuario en localStorage, AuthProvider arranca sin sesión
    renderWithProviders(<Navbar cartCount={0} />);
    expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /registrarse/i })).toBeInTheDocument();
  });

  it("muestra el nombre del usuario si está autenticado", () => {
    // Simulamos usuario en localStorage para que AuthProvider lo cargue
    localStorage.setItem(
      "lug_current_user",
      JSON.stringify({ name: "María Paz", email: "maria@mail.com", tel: "123456789" })
    );

    renderWithProviders(<Navbar cartCount={0} />);
    expect(screen.getByRole("link", { name: /maría paz/i })).toBeInTheDocument();

    // Limpieza para no afectar otros tests
    localStorage.removeItem("lug_current_user");
  });
});