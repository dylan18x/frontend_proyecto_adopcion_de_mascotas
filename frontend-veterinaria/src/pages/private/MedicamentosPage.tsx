import React, { useState } from 'react';
import { Table, Button, Container, Card, Badge } from 'react-bootstrap';
import { MedicamentoForm } from '../../components/medicamentos/MedicamentoForm';

export const MedicamentosPage = () => {
  const [mostrarForm, setMostrarForm] = useState(false);
  const [medAEditar, setMedAEditar] = useState<any>(null);

  const [medicamentos, setMedicamentos] = useState([
    { id: 1, nombre: 'Amoxicilina', presentacion: 'Tabletas 500mg', precio: 5.50, stock: 20 },
    { id: 2, nombre: 'Pipeta Antipulgas', presentacion: 'Unidad 2ml', precio: 12.00, stock: 5 },
    { id: 3, nombre: 'Vitamina Canina', presentacion: 'Jarabe 100ml', precio: 8.50, stock: 0 },
  ]);

  
  const agregarMed = (med: any) => {
    const nuevo = { ...med, id: Date.now() };
    setMedicamentos([...medicamentos, nuevo]);
    cerrarForm();
  };

  const editarMed = (medEditado: any) => {
    setMedicamentos(medicamentos.map(m => (m.id === medEditado.id ? medEditado : m)));
    cerrarForm();
  };

  const eliminarMed = (id: number) => {
    if (window.confirm("¿Eliminar este medicamento del inventario?")) {
      setMedicamentos(medicamentos.filter(m => m.id !== id));
    }
  };

  const prepararEdicion = (med: any) => {
    setMedAEditar(med);
    setMostrarForm(true);
  };

  const cerrarForm = () => {
    setMostrarForm(false);
    setMedAEditar(null);
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="header-title">Farmacia e Inventario</h2>
        <Button 
          variant="success" 
          className="btn-circle shadow"
          onClick={() => { setMedAEditar(null); setMostrarForm(!mostrarForm); }}
        >
          {mostrarForm ? 'Cerrar' : '+ Nuevo Medicamento'}
        </Button>
      </div>

      {mostrarForm && (
        <MedicamentoForm 
          alAgregar={agregarMed}
          alEditar={editarMed}
          medicamentoAEditar={medAEditar}
          alCancelar={cerrarForm}
        />
      )}

      <Card className="card-custom">
        <Card.Body>
          <Table hover responsive className="align-middle">
            <thead className="bg-light">
              <tr>
                <th>Producto</th>
                <th>Presentacion</th>
                <th>Precio</th>
                <th>Stock</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {medicamentos.map((m) => (
                <tr key={m.id}>
                  <td className="fw-bold">{m.nombre}</td>
                  <td>{m.presentacion}</td>
                  <td>${Number(m.precio).toFixed(2)}</td>
                  <td>
                    
                    {m.stock === 0 ? (
                      <Badge bg="danger">Agotado</Badge>
                    ) : m.stock < 10 ? (
                      <Badge bg="warning" text="dark">{m.stock} (Bajo)</Badge>
                    ) : (
                      <Badge bg="success">{m.stock}</Badge>
                    )}
                  </td>
                  <td className="text-center">
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      className="me-2 rounded-pill"
                      onClick={() => prepararEdicion(m)}
                    >
                      editar
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      className="rounded-pill"
                      onClick={() => eliminarMed(m.id)}
                    >
                      eliminar
                    </Button>
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