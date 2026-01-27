import { useEffect, useState } from "react";
import { api } from "../../services/api";

interface Vacuna {
  id: string;
  nombre: string;
  fabricante: string;
}

export default function VacunasUserPage() {
  const [vacunas, setVacunas] = useState<Vacuna[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    const cargarVacunas = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/vacunas");
        setVacunas(data.items || data || []);
      } catch (error) {
        console.error("Error al cargar catálogo de vacunas:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarVacunas();
  }, []);

  // Filtrado en tiempo real
  const vacunasFiltradas = vacunas.filter(v => 
    v.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    v.fabricante.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="row align-items-center mb-4">
        <div className="col-md-7">
          <h2 className="text-primary fw-bold">💉 Catálogo de Vacunas</h2>
          <p className="text-muted">Consulta las vacunas y laboratorios disponibles en Veterinaria Dylan.</p>
        </div>
        <div className="col-md-5">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-white border-end-0">🔍</span>
            <input 
              type="text" 
              className="form-control border-start-0" 
              placeholder="Buscar vacuna o laboratorio..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Cargando catálogo...</p>
        </div>
      ) : vacunasFiltradas.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-3 border">
          <p className="text-muted mb-0">No se encontraron vacunas que coincidan con tu búsqueda.</p>
        </div>
      ) : (
        <div className="row g-3">
          {vacunasFiltradas.map((v) => (
            <div className="col-md-6 col-lg-4" key={v.id}>
              <div className="card h-100 border-0 shadow-sm border-top border-primary border-4">
                <div className="card-body d-flex align-items-center">
                  <div className="flex-shrink-0 me-3">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                      <span className="fs-3">💉</span>
                    </div>
                  </div>
                  <div>
                    <h5 className="card-title fw-bold mb-0 text-dark">{v.nombre}</h5>
                    <p className="card-text text-muted small mb-0">
                      Laboratorio: <span className="fw-semibold">{v.fabricante}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 p-4 bg-primary text-white rounded-4 shadow-sm">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h4>¿Tu mascota necesita una vacuna?</h4>
            <p className="mb-0">Recuerda que mantener el esquema de vacunación al día es vital para su salud.</p>
          </div>
          <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <button className="btn btn-light btn-lg fw-bold text-primary px-4">
              Agendar Cita
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}