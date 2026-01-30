import { render, screen } from '@testing-library/react';
import VaccinationStatus from './VaccinationStatus';

describe("VaccinationStatus", () => {
  test("debe mostrar 'Vacunación Completa' y ser verde cuando completed es true", () => {
    render(<VaccinationStatus completed={true} />);
    const badge = screen.getByTestId("vac-badge");
    expect(badge).toHaveClass('bg-success');
    expect(screen.getByText(/completa/i)).toBeInTheDocument();
  });
});