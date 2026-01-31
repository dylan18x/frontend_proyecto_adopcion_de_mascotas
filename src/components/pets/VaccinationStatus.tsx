import { Badge } from 'react-bootstrap';

export default function VaccinationStatus({ completed }: { completed: boolean }) {
  return (
    <Badge bg={completed ? "success" : "danger"} data-testid="vac-badge">
      {completed ? "Vacunación Completa" : "Pendiente"}
    </Badge>
  );
}