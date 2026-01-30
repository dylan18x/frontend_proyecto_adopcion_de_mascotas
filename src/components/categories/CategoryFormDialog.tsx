import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';

export default function CategoryFormDialog({ open, onClose, onSubmit }: any) {
  const [name, setName] = useState("");

  return (
    <Modal show={open} onHide={onClose}>
      <Form onSubmit={(e) => { e.preventDefault(); onSubmit({ name }); }}>
        <Modal.Header closeButton><Modal.Title>Categoría</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label htmlFor="cat-name">Nombre</Form.Label>
            <Form.Control 
              id="cat-name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Guardar</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}