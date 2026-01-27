import { useEffect, useState, useMemo } from "react";
import { getVacunaciones, type VacunacionDto } from "../../services/vacunaciones.service";

export default function VacunacionesPage() {
  const [vacunaciones, setVacunaciones] = useState<VacunacionDto[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getVacunaciones().then((data) => {
      if (data) setVacunaciones(data);
    });
  }, []);

  const filteredData = useMemo(() => {
    const list = vacunaciones || [];
    const term = search.toLowerCase();
    
    return list.filter(v => 
      // Ahora buscamos directamente por los nombres que el usuario ve
      v.mascota?.nombre?.toLowerCase().includes(term) ||
      v.vacuna?.nombre?.toLowerCase().includes(term)
    );
  }, [vacunaciones, search]);

  return (
    <div className="container py-5">
      <div className="row mb-4 align-items-center">
        <div className="col-md-7">
          <h1 className="h2" style={{ color: '#2d6a4f' }}>🗓️ Registro de Vacunación</h1>
          <p className="text-muted">Historial médico de aplicaciones</p>
        </div>
        <div className="col-md-5">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-white border-end-0">🔍</span>
            <input 
              type="text" 
              className="form-control border-start-0" 
              placeholder="Buscar por mascota o vacuna..." 
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
                <th className="px-4 py-3">Paciente (Mascota)</th>
                <th className="py-3">Vacuna</th>
                <th className="py-3">Fecha de Aplicación</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map(v => (
                  <tr key={v.id}>
                    <td className="px-4 py-3 fw-bold text-success">
                      {v.mascota?.nombre || "Mascota no identificada"}
                    </td>
                    <td className="py-3">
                      <span className="badge bg-primary px-3 py-2">
                        {v.vacuna?.nombre || "Vacuna no identificada"}
                      </span>
                    </td>
                    <td className="py-3 text-muted">
                      {new Date(v.fecha).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-5 text-muted">
                    No se encontraron registros de vacunación.
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