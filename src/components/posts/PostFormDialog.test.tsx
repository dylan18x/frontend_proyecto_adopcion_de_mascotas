import { render, screen, fireEvent } from '@testing-library/react';
import PostFormDialog from './PostFormDialog';

describe("PostFormDialog", () => {
  test("enviar el titulo y contenidp", () => {
    const mockSubmit = jest.fn();
    render(<PostFormDialog open={true} onSubmit={mockSubmit} onClose={() => {}} />);
    
    const inputTitulo = screen.getByLabelText(/título/i);
    const inputContenido = screen.getByLabelText(/contenido/i);
    const botonPublicar = screen.getByText(/publicar/i);

    fireEvent.change(inputTitulo, { target: { value: 'Mi primer post' } });
    fireEvent.change(inputContenido, { target: { value: 'Hola a todos' } });
    fireEvent.click(botonPublicar);

    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'Mi primer post',
      content: 'Hola a todos'
    });
  });
});