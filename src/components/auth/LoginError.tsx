import { Alert } from 'react-bootstrap';

export default function LoginError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <Alert variant="danger" data-testid="login-alert">
      ❌ {message}
    </Alert>
  );
}