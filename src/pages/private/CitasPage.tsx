import { useEffect, useState, useMemo } from "react";
import { getCitas, type CitaDto } from "../../services/citas.service";

export default function CitasPage() {
  const [citas, setCitas] = useState<CitaDto[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCitas().then((data) => {
      if (data) setCitas(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filteredCitas = useMemo(() => {
    const list = citas || [];
    return list.filter(c => 
      c.motivo?.toLowerCase().includes(search.toLowerCase()) ||
      c.fecha?.includes(search) || 
      c.mascota?.nombre?.toLowerCase().includes(search.toLowerCase())
    );
  }, [citas, search]);

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100" style={{ backgroundColor: "#fcf9f5" }}>
        <div className="spinner-border" style={{ color: "#2d5a27" }} role="status"></div>
        <p className="mt-3 fw-bold" style={{ color: "#2d5a27" }}>Cargando tus citas...</p>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ backgroundColor: "#fcf9f5", minHeight: "100vh" }}>
      
      <div className="row mb-5 align-items-center">
        <div className="col-md-7 text-center text-md-start">
          <h1 className="display-6 fw-bold" style={{ color: '#2d5a27' }}>
            📅 Mis <span style={{ color: '#d2b48c' }}>Citas</span>
          </h1>
          <p className="lead" style={{ color: '#4a3728' }}>Revisa los próximos encuentros para el cuidado de tu mascota.</p>
        </div>
        
        <div className="col-md-5">
          <div className="input-group shadow-sm" style={{ borderRadius: "50px", overflow: "hidden" }}>
            <span className="input-group-text border-0 bg-white ps-4">🔍</span>
            <input 
              type="text" 
              className="form-control border-0 py-3" 
              placeholder="Buscar por mascota o fecha..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ outline: "none", boxShadow: "none" }}
            />
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-lg" style={{ borderRadius: "30px", overflow: "hidden" }}>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead style={{ backgroundColor: '#2d5a27', color: 'white' }}>
                <tr className="text-uppercase small fw-bold" style={{ letterSpacing: "1px" }}>
                  <th className="px-4 py-4">Fecha</th>
                  <th className="py-4">Hora</th>
                  <th className="py-4">Motivo de Visita</th>
                  <th className="py-4">Mascota</th>
                  <th className="py-4">Veterinario</th>
                </tr>
              </thead>
              <tbody>
                {filteredCitas.length > 0 ? (
                  filteredCitas.map(c => (
                    <tr key={c.id_cita} style={{ borderBottom: "1px solid #f1ece6" }}>
                      <td className="px-4 py-4">
                        <span className="fw-bold" style={{ color: '#2d5a27' }}>{c.fecha}</span>
                      </td>
                      <td className="py-4">
                        <span className="badge rounded-pill px-3 py-2" style={{ backgroundColor: '#fcf9f5', color: '#8b4513', border: '1px solid #d2b48c' }}>
                          {c.hora}
                        </span>
                      </td>
                      <td className="py-4 fw-semibold" style={{ color: '#4a3728' }}>{c.motivo}</td>
                      <td className="py-4">
                        <div className="d-flex align-items-center">
                          <span className="me-2">🐾</span>
                          {c.mascota?.nombre || 'Mi Mascota'}
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="text-muted">👨‍⚕️ {c.veterinario?.nombre || 'Por asignar'}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-5">
                      <div className="py-4">
                        <h5 className="text-muted">No encontramos citas para "{search}"</h5>
                        <p className="small text-muted">Intenta con otra palabra clave</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <p className="small" style={{ color: '#d2b48c' }}>
          * Si necesitas cancelar o reprogramar, por favor contáctanos con 24h de antelación.
        </p>
      </div>
    </div>
  );
}