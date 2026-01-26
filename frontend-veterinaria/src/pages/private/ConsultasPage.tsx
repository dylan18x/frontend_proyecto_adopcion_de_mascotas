import React, { useState } from 'react';
import { Table, Button, Container, Card } from 'react-bootstrap';
import { ConsultaForm } from '../../components/consultas/ConsultaForm';

export const ConsultasPage = () => {
  
  const [mostrarForm, setMostrarForm] = useState(false);

  
  const consultasPrueba = [
    { id: 1, fecha: '2026-01-28', mascota: 'Firulais', diagnostico: 'Gripe canina' },
    { id: 2, fecha: '2026-01-29', mascota: 'Michi', diagnostico: 'Alergia' },
  ];

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestin de Consultas</h2>
        <Button variant="info" onClick={() => setMostrarForm(!mostrarForm)}>
          {mostrarForm ? '- Cancelar' : '+ Nueva Consulta'}
        </Button>
      </div>

      
      {mostrarForm && <ConsultaForm />}

      <Card>
        <Card.Header>Historial de Consultas</Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Fecha</th>
                <th>Mascota</th>
                <th>Diagnóstico</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {consultasPrueba.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.fecha}</td>
                  <td>{c.mascota}</td>
                  <td>{c.diagnostico}</td>
                  <td>
                    <Button variant="secondary" size="sm">Ver Detalles</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};