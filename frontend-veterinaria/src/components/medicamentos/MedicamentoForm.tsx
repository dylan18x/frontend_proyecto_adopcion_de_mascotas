import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

interface Props {
  alAgregar: (med: any) => void;
  alEditar: (med: any) => void;
  medicamentoAEditar: any;
  alCancelar: () => void;
}

const estadoInicial = {
  nombre: '',
  presentacion: '',
  precio: '', 
  stock: ''
};

export const MedicamentoForm = ({ alAgregar, alEditar, medicamentoAEditar, alCancelar }: Props) => {
  const [form, setForm] = useState(estadoInicial);

  useEffect(() => {
    if (medicamentoAEditar) {
      setForm(medicamentoAEditar);
    } else {
      setForm(estadoInicial);
    }
  }, [medicamentoAEditar]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const medGuardar = {
      ...form,
      precio: parseFloat(form.precio.toString()),
      stock: parseInt(form.stock.toString())
    };

    if (medicamentoAEditar) {
      alEditar(medGuardar);
    } else {
      alAgregar(medGuardar);
    }
    setForm(estadoInicial);
  };

  return (
    <Card className="mb-4 card-custom">
      <Card.Header className={medicamentoAEditar ? "bg-warning text-dark" : "bg-success text-white"}>
        {medicamentoAEditar ? " Editando Medicamento" : " Registrar Medicamento"}
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>Nombre Comercial</Form.Label>
                <Form.Control 
                  type="text" 
                  name="nombre" 
                  value={form.nombre} 
                  onChange={handleChange} 
                  required 
                  placeholder="Ej: Amoxicilina"
                />
              </Form.Group>
            </div>
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>Presentación</Form.Label>
                <Form.Control 
                  type="text" 
                  name="presentacion" 
                  value={form.presentacion} 
                  onChange={handleChange} 
                  required 
                  placeholder="Ej: Caja 10 tabletas"
                />
              </Form.Group>
            </div>
          </div>

          
          <div className="row">
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>Precio ($)</Form.Label>
                <Form.Control 
                  type="number" 
                  step="0.01" 
                  name="precio" 
                  value={form.precio} 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>
            </div>
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>Stock Disponible</Form.Label>
                <Form.Control 
                  type="number" 
                  name="stock" 
                  value={form.stock} 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={alCancelar}>Cancelar</Button>
            <Button variant={medicamentoAEditar ? "warning" : "success"} type="submit">
              {medicamentoAEditar ? "Actualizar" : "Guardar"}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};