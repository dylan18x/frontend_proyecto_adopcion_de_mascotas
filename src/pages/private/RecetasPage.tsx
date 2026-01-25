import { useEffect, useState, useMemo } from "react";
import { getRecetas, type RecetaDto } from "../../services/recetas.service";

export default function RecetasPage() {
  const [recetas, setRecetas] = useState<RecetaDto[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecetas()
      .then((data) => {
        if (data) setRecetas(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredRecetas = useMemo(() => {
    const list = recetas || [];
    const term = search.toLowerCase();

    return list.filter(r => 
      r.medicamento?.nombre?.toLowerCase().includes(term) ||
      r.consulta?.motivo?.toLowerCase().includes(term) ||
      r.duracion?.toLowerCase().includes(term)
    );
  }, [recetas, search]);

  return (
    <div className="container py-5">
      <div className="row mb-4 align-items-center">
        <div className="col-md-7">
          <h1 className="h2" style={{ color: '#2d6a4f' }}>📝 Recetas Médicas</h1>
          <p className="text-muted">Control de tratamientos y medicación</p>
        </div>
        <div className="col-md-5">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-white border-end-0">🔍</span>
            <input 
              type="text" 
              className="form-control border-start-0" 
              placeholder="Buscar por medicamento o consulta..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead style={{ backgroundColor: '#d8f3dc' }}>
              <tr>
                <th className="px-4 py-3">Medicamento</th>
                <th className="py-3">Dosis</th>
                <th className="py-3">Duración</th>
                <th className="py-3">Motivo de Consulta</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-5 text-muted">
                    <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                    Cargando recetas...
                  </td>
                </tr>
              ) : filteredRecetas.length > 0 ? (
                filteredRecetas.map(r => (
                  <tr key={r.id}>
                    <td className="px-4 py-3 fw-bold text-success">
                      {r.medicamento?.nombre || "No especificado"}
                    </td>
                    <td className="py-3">{r.dosis}</td>
                    <td className="py-3">
                      <span className="badge bg-light text-dark border">
                        {r.duracion}
                      </span>
                    </td>
                    <td className="py-3 text-muted">
                      {r.consulta?.motivo || "Consulta General"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-5 text-muted">
                    No se encontraron recetas médicas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}