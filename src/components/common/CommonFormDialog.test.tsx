import { render, screen, fireEvent } from '@testing-library/react';
import CommonFormDialog from './CommonFormDialog';

describe("CommonFormDialog", () => {
  test("eliminar al ejecutar onclick", () => {
    const mockConfirm = jest.fn();
    render(
      <CommonFormDialog 
        open={true} 
        title="Borrar" 
        description="¿Seguro?" 
        onConfirm={mockConfirm} 
        onCancel={() => {}} 
      />
    );

    const botonEliminar = screen.getByText(/eliminar/i);
    fireEvent.click(botonEliminar);

    expect(mockConfirm).toHaveBeenCalledTimes(1);
  });
});