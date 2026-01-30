import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';

export default function PostFormDialog({ open, onClose, onSubmit }: any) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const alEnviar = (e: any) => {
    e.preventDefault();
    onSubmit({ title, content });
  };

  return (
    <Modal show={open} onHide={onClose}>
      <Form onSubmit={alEnviar}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="post-title">Título</Form.Label>
            <Form.Control 
              id="post-title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="post-content">Contenido</Form.Label>
            <Form.Control 
              id="post-content" 
              as="textarea" 
              rows={3} 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              required 
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="primary">Publicar</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}