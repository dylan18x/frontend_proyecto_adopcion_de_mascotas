import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

interface Props {
  alAgregar: (cita: any) => void;
  alEditar: (cita: any) => void;
  citaAEditar: any; 
  alCancelar: () => void;
}


const estadoInicial = {
  fecha: '',
  hora: '',
  mascota: 'Firulais',
  veterinario: 'Dr. Pérez',
  motivo: ''
};

export const CitaForm = ({ alAgregar, alEditar, citaAEditar, alCancelar }: Props) => {
  
  const [form, setForm] = useState(estadoInicial);

  
  useEffect(() => {
    if (citaAEditar) {
      setForm(citaAEditar);
    } else {
      setForm(estadoInicial);
    }
  }, [citaAEditar]);

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (citaAEditar) {
      alEditar(form); 
    } else {
      alAgregar(form); 
    }
    setForm(estadoInicial); 
  };

  return (
    <Card className="mb-4 card-custom">
      <Card.Header className={citaAEditar ? "bg-warning text-dark" : "bg-primary text-white"}>
        {citaAEditar ? " Editando Cita" : " Nueva Cita"}
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>Fecha</Form.Label>
                <Form.Control 
                  type="date" 
                  name="fecha" 
                  value={form.fecha} 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>
            </div>
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>Hora</Form.Label>
                <Form.Control 
                  type="time" 
                  name="hora" 
                  value={form.hora} 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>Mascota</Form.Label>
                <Form.Select name="mascota" value={form.mascota} onChange={handleChange}>
                  <option value="Firulais">Firulais</option>
                  <option value="Michi">Michi</option>
                  <option value="Rex">Rex</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>Veterinario</Form.Label>
                <Form.Select name="veterinario" value={form.veterinario} onChange={handleChange}>
                  <option value="Dr. Pérez">Dr. Pérez</option>
                  <option value="Dra. Gómez">Dra. Gómez</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Motivo</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={2} 
              name="motivo" 
              value={form.motivo} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={alCancelar}>Cancelar</Button>
            <Button variant={citaAEditar ? "warning" : "success"} type="submit">
              {citaAEditar ? "Actualizar Cambios" : "Guardar Cita"}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};