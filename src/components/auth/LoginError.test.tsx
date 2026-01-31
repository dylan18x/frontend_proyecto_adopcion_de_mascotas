import { render, screen } from '@testing-library/react';
import LoginError from './LoginError';

describe("LoginError", () => {
  test("Sad path: renderizar el mensaje de error de credenciales", () => {
    const errorMsg = "Usuario o contraseña incorrectos";
    render(<LoginError message={errorMsg} />);
    
    const alert = screen.getByTestId("login-alert");
    expect(alert).toBeInTheDocument();
    expect(screen.getByText(new RegExp(errorMsg, 'i'))).toBeInTheDocument();
  });
});