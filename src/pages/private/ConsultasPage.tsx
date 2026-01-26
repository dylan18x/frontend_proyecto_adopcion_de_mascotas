import { useEffect, useState, useMemo } from "react";
import { getConsultas, type ConsultaDto } from "../../services/consultas.service";

export default function ConsultasPage() {
  const [consultas, setConsultas] = useState<ConsultaDto[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getConsultas().then((data) => {
      if (data) setConsultas(data);
    });
  }, []);

  const filteredConsultas = useMemo(() => {
    const list = consultas || [];
    return list.filter(c => 
      c.diagnostico?.toLowerCase().includes(search.toLowerCase()) ||
      c.tratamiento?.toLowerCase().includes(search.toLowerCase())
    );
  }, [consultas, search]);

  return (
    <div className="container py-5">
      <div className="row mb-4 align-items-center">
        <div className="col-md-7">
          <h1 className="h2" style={{ color: '#2d6a4f' }}>
            🩺 Historial Médico
          </h1>
          <p className="text-muted">Resultados de diagnósticos y tratamientos</p>
        </div>
        <div className="col-md-5">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-white border-end-0">🔍</span>
            <input 
              type="text" 
              className="form-control border-start-0" 
              placeholder="Buscar diagnóstico o tratamiento..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead style={{ backgroundColor: '#d8f3dc' }}>
                <tr>
                  <th className="px-4 py-3" style={{width: '25%'}}>Diagnóstico</th>
                  <th className="py-3" style={{width: '30%'}}>Tratamiento Recetado</th>
                  <th className="py-3">Observaciones Adicionales</th>
                </tr>
              </thead>
              <tbody>
                {filteredConsultas.length > 0 ? (
                  filteredConsultas.map(c => (
                    <tr key={c.id}>
                      <td className="px-4 py-3 fw-bold text-dark">{c.diagnostico}</td>
                      <td className="py-3 text-primary">{c.tratamiento}</td>
                      <td className="py-3 text-muted fst-italic">
                        {c.observaciones || "Sin observaciones"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-5 text-muted">
                      No se encontraron consultas: "{search}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}