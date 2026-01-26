import React, { useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import './App.css'; 


import { CitasPage } from "./pages/private/CitasPage";
import { ConsultasPage } from "./pages/private/ConsultasPage";
import { MedicamentosPage } from "./pages/private/MedicamentosPage";

function App() {
  const [paginaActual, setPaginaActual] = useState('citas');

  const renderizarPagina = () => {
    switch (paginaActual) {
      case 'citas': return <CitasPage />;
      case 'consultas': return <ConsultasPage />;
      case 'medicamentos': return <MedicamentosPage />;
      default: return <CitasPage />;
    }
  };

  return (
    <div className="app-container">
      
      <Navbar bg="white" variant="light" expand="lg" className="mb-4 shadow-sm py-3">
        <Container>
          <Navbar.Brand href="#" className="fw-bold text-primary">
             VetSystem
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link 
                onClick={() => setPaginaActual('citas')} 
                className={paginaActual === 'citas' ? 'active fw-bold text-primary' : ''}
              >
                 Citas
              </Nav.Link>
              <Nav.Link 
                onClick={() => setPaginaActual('consultas')}
                className={paginaActual === 'consultas' ? 'active fw-bold text-primary' : ''}
              >
                 Consultas
              </Nav.Link>
              <Nav.Link 
                onClick={() => setPaginaActual('medicamentos')}
                className={paginaActual === 'medicamentos' ? 'active fw-bold text-primary' : ''}
              >
                 Medicamentos
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      
      <div className="contenido-principal">
        {renderizarPagina()}
      </div>
    
      <footer className="text-center mt-5 py-3 text-muted" style={{fontSize: '0.8rem'}}>
        <p>© 2026 Sistema Veterinario - Proyecto Final</p>
      </footer>
    </div>
  );
}

export default App;