import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';

export const ConsultaForm = () => {
  return (
    <Card className="mb-4">
      <Card.Header>Nueva Consulta Medica</Card.Header>
      <Card.Body>
        <Form>
          
          <Form.Group className="mb-3">
            <Form.Label>Cita Asociada</Form.Label>
            <Form.Select>
              <option>Seleccione una cita pendiente...</option>
              <option value="1">Cita #1 - Firulais (10:00 AM)</option>
              <option value="2">Cita #2 - Michi (03:30 PM)</option>
            </Form.Select>
          </Form.Group>

          
          <Form.Group className="mb-3">
            <Form.Label>Diagnostico</Form.Label>
            <Form.Control type="text" placeholder="Ej: Infección estomacal" required />
          </Form.Group>

          
          <Form.Group className="mb-3">
            <Form.Label>Tratamiento</Form.Label>
            <Form.Control as="textarea" rows={2} placeholder="Ej: Antibióticos cada 8 horas..." required />
          </Form.Group>

          
          <Form.Group className="mb-3">
            <Form.Label>Observaciones</Form.Label>
            <Form.Control as="textarea" rows={2} placeholder="Notas adicionales..." />
          </Form.Group>

          
          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary">Cancelar</Button>
            <Button variant="primary" type="submit">Guardar Consulta</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};