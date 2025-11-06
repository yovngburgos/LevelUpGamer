import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from '../Navbar'

const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

describe('Navbar', () => {
  it('muestra el contador del carrito', () => {
    renderWithRouter(<Navbar cartCount={5} isAuthenticated={false} />)
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('muestra Login/Registrarse si no está autenticado', () => {
    renderWithRouter(<Navbar cartCount={0} isAuthenticated={false} />)
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /registrarse/i })).toBeInTheDocument()
  })

  it('muestra Cuenta si está autenticado', () => {
    renderWithRouter(<Navbar cartCount={0} isAuthenticated={true} />)
    expect(screen.getByRole('link', { name: /cuenta/i })).toBeInTheDocument()
  })
})
