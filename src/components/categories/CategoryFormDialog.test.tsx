import { render, screen, fireEvent } from '@testing-library/react';
import CategoryFormDialog from './CategoryFormDialog';

describe("CategoryFormDialog", () => {
  test("envia el nombre de la categoria", () => {
    const mockSubmit = jest.fn();
    render(<CategoryFormDialog open={true} onSubmit={mockSubmit} />);
    const input = screen.getByLabelText(/nombre/i);

    fireEvent.change(input, { target: { value: 'Salud' } });
    fireEvent.click(screen.getByText(/guardar/i));

    expect(mockSubmit).toHaveBeenCalledWith({ name: 'Salud' });
  });
});