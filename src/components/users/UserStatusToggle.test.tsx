import { render, screen, fireEvent } from '@testing-library/react';
import UserStatusToggle from './UserStatusToggle';

describe("UserStatusToggle", () => {
  test("debe disparar la función onToggle al hacer click", () => {
    const mockToggle = jest.fn();
    render(<UserStatusToggle isActive={true} onToggle={mockToggle} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockToggle).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/desactivar/i)).toBeInTheDocument();
  });
});