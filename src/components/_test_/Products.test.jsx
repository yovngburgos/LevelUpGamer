import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Products from '../../pages/Products'

const renderR = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

describe('Products page', () => {
  it('renderiza las 6 tarjetas de productos', () => {
    renderR(<Products onAdd={() => {}} />)

    const cards = screen.getAllByRole('article')
    expect(cards.length).toBe(6)
  })

  it('al clickear "Añadir 🛒" de PC Gamer Bestia RGB se llama onAdd con ese producto', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()

    renderR(<Products onAdd={onAdd} />)

    // Encuentra el título del producto
    const heading = screen.getByRole('heading', { name: /pc gamer bestia rgb/i })

    // Sube hasta la card
    const card = heading.closest('article')
    expect(card).not.toBeNull()

    // Busca el botón dentro
    const addButton = within(card).getByRole('button', { name: /añadir/i })

    // Clic
    await user.click(addButton)

    // Fue llamado
    expect(onAdd).toHaveBeenCalledTimes(1)

    // El producto pasado debe tener al menos estos datos
    expect(onAdd.mock.calls[0][0]).toMatchObject({
      title: 'PC Gamer Bestia RGB',
      sku: 'PCGAMER002',
      price: 2450000
    })
  })
})
