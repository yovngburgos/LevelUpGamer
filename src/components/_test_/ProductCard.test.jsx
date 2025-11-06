import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductCard from '../ProductCard'

describe('ProductCard', () => {
  const base = {
    image: '/imagenes/notebook_gamer.jpg',
    title: 'Notebook Gamer Ultra Pro',
    description: 'Procesador i9, RTX 4080, 32GB RAM.',
    price: 1899990,
    color: 'Negro',
  }

  it('muestra título, descripción y precio formateado en CLP', () => {
    render(<ProductCard {...base} onAdd={() => {}} />)

    expect(screen.getByText(base.title)).toBeInTheDocument()
    expect(screen.getByText(base.description)).toBeInTheDocument()

    // Buscamos el precio formateado (no dependemos exacto del separador)
    expect(screen.getByText(/\$?\s?1\.?899\.?990/)).toBeInTheDocument()
  })

  it('llama onAdd al clickear "Añadir 🛒"', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()

    render(<ProductCard {...base} onAdd={onAdd} />)

    await user.click(screen.getByRole('button', { name: /añadir/i }))
    expect(onAdd).toHaveBeenCalledTimes(1)
  })
})
