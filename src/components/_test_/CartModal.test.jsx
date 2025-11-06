import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CartModal from '../CartModal'

const fmt = (n) => n.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })

describe('CartModal', () => {
  it('muestra mensaje cuando el carrito está vacío', () => {
    render(<CartModal cartItems={[]} />)
    expect(screen.getByText(/No hay productos en el carrito/i)).toBeInTheDocument()
  })

  it('calcula subtotal por línea y total usando qty', () => {
    const items = [
      { id: 'NOTEBOOK001', title: 'Notebook', price: 1000, qty: 2 },
      { id: 'MOUSE004', title: 'Mouse',    price:  500, qty: 3 },
    ]

    render(<CartModal cartItems={items} />)

    // Subtotales
    expect(screen.getAllByText(fmt(2000)).length).toBeGreaterThan(0) // 1000 * 2
    expect(screen.getAllByText(fmt(1500)).length).toBeGreaterThan(0) // 500 * 3

    // Total = 3500
    expect(screen.getByText(fmt(3500))).toBeInTheDocument()
  })

  it('dispara onIncItem y onDecItem al clickear + y −', async () => {
    const user = userEvent.setup()
    const onIncItem = vi.fn()
    const onDecItem = vi.fn()

    const items = [{ id: 'HEADSET003', title: 'Headset', price: 1000, qty: 1 }]

    render(
      <CartModal
        cartItems={items}
        onIncItem={onIncItem}
        onDecItem={onDecItem}
      />
    )

    // Botón +
    const plus = screen.getByRole('button', { name: /aumentar cantidad/i, hidden: true })
    await user.click(plus)
    expect(onIncItem).toHaveBeenCalledTimes(1)

    const minus = screen.getByRole('button', { name: /disminuir cantidad/i, hidden: true })
    await user.click(minus)
    expect(onDecItem).toHaveBeenCalledTimes(1)

  })
})
