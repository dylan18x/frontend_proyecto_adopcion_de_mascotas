import { useEffect, useState } from "react";
import { getMisConsultas, type ConsultaDto } from "../../services/consultas.service";

export default function ConsultasUserPage() {
  const [consultas, setConsultas] = useState<ConsultaDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMisConsultas()
      .then((data) => setConsultas(data || []))
      .catch((err) => console.error("Error al cargar consultas:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <div className="spinner-border" style={{ color: "#2d5a27" }} role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ minHeight: "100vh" }}>
      {/* HEADER */}
      <div className="text-center mb-5">
        <h2 style={{ fontWeight: 800, color: "#2d5a27" }}>
          Historial de <span style={{ color: "#d2b48c" }}>Bienestar</span>
        </h2>
        <p className="text-muted">Consulta los resultados médicos de tus mascotas en Huellitas Felices</p>
      </div>

      {consultas.length === 0 ? (
        <div className="text-center p-5 bg-white rounded-4 shadow-sm">
          <p className="text-muted mb-0">No se encontraron registros médicos para tus mascotas.</p>
        </div>
      ) : (
        <div className="row g-4">
          {consultas.map((c) => (
            <div className="col-12" key={c.id}>
              <div 
                className="card border-0 shadow-sm" 
                style={{ 
                  borderRadius: "20px", 
                  borderLeft: "8px solid #2d5a27",
                  backgroundColor: "#ffffff" 
                }}
              >
                <div className="card-body p-4">
                  {/* Título y Fecha */}
                  <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                    <div className="d-flex align-items-center">
                      <span className="me-2" style={{ fontSize: "1.5rem" }}>🐾</span>
                      <h4 className="mb-0" style={{ fontWeight: 800, color: "#4a3728" }}>
                        {c.cita?.mascota?.nombre || "Paciente"}
                      </h4>
                    </div>
                    <span 
                      className="badge px-3 py-2 mt-2 mt-sm-0" 
                      style={{ 
                        backgroundColor: "#f1f8e9", 
                        color: "#2d5a27", 
                        borderRadius: "50px",
                        fontSize: "0.9rem" 
                      }}
                    >
                      {c.cita?.fecha ? new Date(c.cita.fecha).toLocaleDateString() : "Fecha pendiente"}
                    </span>
                  </div>

                  <hr className="my-3 opacity-25" />

                  {/* Diagnóstico y Tratamiento */}
                  <div className="row">
                    <div className="col-md-6 mb-4 mb-md-0">
                      <div className="d-flex align-items-center mb-2">
                        <span style={{ color: "#d2b48c", marginRight: "8px" }}>📋</span>
                        <h6 className="text-uppercase mb-0" style={{ color: "#d2b48c", fontWeight: 900, fontSize: "0.8rem", letterSpacing: "1px" }}>
                          Diagnóstico Clínico
                        </h6>
                      </div>
                      <p className="mb-0" style={{ color: "#4a3728", lineHeight: "1.6" }}>{c.diagnostico}</p>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="d-flex align-items-center mb-2">
                        <span style={{ color: "#2d5a27", marginRight: "8px" }}>💊</span>
                        <h6 className="text-uppercase mb-0" style={{ color: "#2d5a27", fontWeight: 900, fontSize: "0.8rem", letterSpacing: "1px" }}>
                          Tratamiento Sugerido
                        </h6>
                      </div>
                      <p className="mb-0" style={{ color: "#4a3728", lineHeight: "1.6" }}>{c.tratamiento}</p>
                    </div>
                  </div>

                  {/* Observaciones Adicionales */}
                  {c.observaciones && (
                    <div 
                      className="mt-4 p-3 rounded-3" 
                      style={{ 
                        backgroundColor: "#fcf9f5", 
                        border: "1px dashed #d2b48c",
                        fontStyle: "italic"
                      }}
                    >
                      <small className="text-muted">
                        <strong>Nota del veterinario:</strong> {c.observaciones}
                      </small>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}