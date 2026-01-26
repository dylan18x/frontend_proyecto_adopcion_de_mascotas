import React, { useState } from 'react';
import { Table, Button, Container, Card } from 'react-bootstrap';
import { CitaForm } from '../../components/citas/CitaForm';

export const CitasPage = () => {
  const [mostrarForm, setMostrarForm] = useState(false);
  const [citaAEditar, setCitaAEditar] = useState<any>(null);
  
  const [citas, setCitas] = useState([
    { id: 1, fecha: '2026-01-28', hora: '10:00', motivo: 'Vacuna anual', mascota: 'Firulais', veterinario: 'Dr. Perez' },
    { id: 2, fecha: '2026-01-29', hora: '15:30', motivo: 'Revisión pata', mascota: 'Michi', veterinario: 'Dra. Gomez' },
  ]);

  

  const agregarCita = (cita: any) => {
    const nueva = { ...cita, id: Date.now() }; 
    setCitas([...citas, nueva]);
    cerrarFormulario();
  };

  const editarCita = (citaEditada: any) => {
    
    const listaActualizada = citas.map(c => (c.id === citaEditada.id ? citaEditada : c));
    setCitas(listaActualizada);
    cerrarFormulario();
  };

  const eliminarCita = (id: number) => {
    if (window.confirm("¿Seguro que quieres borrar esta cita?")) {
      setCitas(citas.filter(c => c.id !== id));
    }
  };

  const prepararEdicion = (cita: any) => {
    setCitaAEditar(cita); 
    setMostrarForm(true); 
  };

  const cerrarFormulario = () => {
    setMostrarForm(false);
    setCitaAEditar(null); 
  };

  return (
    <Container className="mt-5 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="header-title">Gestion de Citas</h2>
        <Button 
          variant="primary" 
          className="btn-circle shadow"
          onClick={() => { setCitaAEditar(null); setMostrarForm(!mostrarForm); }}
        >
          {mostrarForm ? 'Cerrar' : '+ Nueva Cita'}
        </Button>
      </div>

      {mostrarForm && (
        <CitaForm 
          alAgregar={agregarCita} 
          alEditar={editarCita}
          citaAEditar={citaAEditar}
          alCancelar={cerrarFormulario} 
        />
      )}

      <Card className="card-custom">
        <Card.Body>
          {citas.length === 0 ? (
            <p className="text-center text-muted p-3">No hay citas registradas. ¡Agrega una!</p>
          ) : (
            <Table hover responsive className="align-middle">
              <thead className="bg-light">
                <tr>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Mascota</th>
                  <th>Veterinario</th>
                  <th>Motivo</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {citas.map((cita) => (
                  <tr key={cita.id}>
                    <td>{cita.fecha}</td>
                    <td><span className="badge bg-info text-dark">{cita.hora}</span></td>
                    <td><strong>{cita.mascota}</strong></td>
                    <td>{cita.veterinario}</td>
                    <td>{cita.motivo}</td>
                    <td className="text-center">
                      <Button 
                        variant="outline-warning" 
                        size="sm" 
                        className="me-2 rounded-pill"
                        onClick={() => prepararEdicion(cita)}
                      >
                        Editar
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        className="rounded-pill"
                        onClick={() => eliminarCita(cita.id)}
                      >
                        eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};