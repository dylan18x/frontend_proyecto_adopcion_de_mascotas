import { useEffect, useState } from "react";
import { api } from "../../services/api";

interface Receta {
  id: string;
  dosis: string;
  duracion: string;
  medicamento?: { nombre: string };
  consulta?: { 
    diagnostico: string;
    mascota?: { nombre: string };
  };
}

export default function RecetasPage() {
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState(""); // Estado para el buscador

  useEffect(() => {
    const cargarRecetas = async () => {
      try {
        setLoading(true);
        const response = await api.get("/recetas");
        const data = response.data.items || response.data || [];
        setRecetas(data);
      } catch (error) {
        console.error("Error al cargar recetas:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarRecetas();
  }, []);

  // Lógica del filtro: Busca por nombre de mascota o nombre de medicamento
  const recetasFiltradas = recetas.filter((r) => {
    const busqueda = filtro.toLowerCase();
    const nombreMascota = r.consulta?.mascota?.nombre?.toLowerCase() || "";
    const nombreMedicamento = r.medicamento?.nombre?.toLowerCase() || "";
    const diagnostico = r.consulta?.diagnostico?.toLowerCase() || "";

    return (
      nombreMascota.includes(busqueda) || 
      nombreMedicamento.includes(busqueda) ||
      diagnostico.includes(busqueda)
    );
  });

  return (
    <div className="container mt-4">
      <div className="row align-items-center mb-4">
        <div className="col-md-6">
          <h2 className="text-primary fw-bold mb-0">📋 Mis Recetas Médicas</h2>
        </div>
        <div className="col-md-6 mt-3 mt-md-0">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-white border-end-0">
              🔍
            </span>
            <input
              type="text"
              className="form-control border-start-0 ps-0"
              placeholder="Buscar por mascota, medicamento o diagnóstico..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Cargando tus recetas...</p>
        </div>
      ) : recetasFiltradas.length === 0 ? (
        <div className="alert alert-light border text-center py-5 shadow-sm rounded-4">
          <p className="mb-0 text-muted fs-5">
            {filtro ? `No se encontraron resultados para "${filtro}"` : "Aún no hay recetas registradas."}
          </p>
        </div>
      ) : (
        <div className="row g-4">
          {recetasFiltradas.map((r) => (
            <div className="col-md-6 col-lg-4" key={r.id}>
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-header bg-primary text-white py-3">
                  <h5 className="card-title mb-0">
                    🐶 {r.consulta?.mascota?.nombre || "Mascota"}
                  </h5>
                </div>
                
                <div className="card-body">
                  <div className="mb-3">
                    <h6 className="text-uppercase text-muted small fw-bold mb-1">Medicamento</h6>
                    <p className="fs-5 fw-bold text-dark mb-0">
                      {r.medicamento?.nombre || "No especificado"}
                    </p>
                  </div>
                  
                  <div className="mb-3">
                    <h6 className="text-uppercase text-muted small fw-bold mb-1">Dosis y Duración</h6>
                    <p className="text-primary fw-bold mb-0">
                      {r.dosis} <span className="text-muted fw-normal">|</span> {r.duracion}
                    </p>
                  </div>
                  
                  <hr className="my-3 opacity-25" />
                  
                  <div>
                    <h6 className="text-uppercase text-muted small fw-bold mb-1">Diagnóstico</h6>
                    <p className="card-text text-secondary small bg-light p-2 rounded">
                      {r.consulta?.diagnostico || "Sin diagnóstico registrado."}
                    </p>
                  </div>
                </div>

                <div className="card-footer bg-transparent border-0 text-center pb-3">
                  <small className="text-muted italic" style={{ fontSize: '0.75rem' }}>
                    Veterinaria Cuidando a tu mejor amigo
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}