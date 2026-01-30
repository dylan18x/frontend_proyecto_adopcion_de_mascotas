import { Button } from 'react-bootstrap';

export default function UserStatusToggle({ isActive, onToggle }: any) {
  return (
    <Button 
      variant={isActive ? "outline-danger" : "outline-success"} 
      onClick={onToggle}
    >
      {isActive ? "Desactivar Usuario" : "Activar Usuario"}
    </Button>
  );
}