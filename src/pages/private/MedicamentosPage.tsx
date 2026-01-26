import { useEffect, useState, useMemo } from "react";
import { getMedicamentos, type MedicamentoDto } from "../../services/medicamentos.service";

export default function MedicamentosPage() {
  const [meds, setMeds] = useState<MedicamentoDto[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getMedicamentos().then((data) => {
      if (data) setMeds(data);
    });
  }, []);

  const filteredMeds = useMemo(() => {
    const list = meds || [];
    return list.filter(m => 
      m.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      m.descripcion?.toLowerCase().includes(search.toLowerCase())
    );
  }, [meds, search]);

  return (
    <div className="container py-5">
      <div className="row mb-4 align-items-center">
        <div className="col-md-7">
          <h1 className="h2" style={{ color: '#2d6a4f' }}>
            💊 Farmacia e Inventario
          </h1>
          <p className="text-muted">Listado de medicamentos disponibles</p>
        </div>
        <div className="col-md-5">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-white border-end-0">🔍</span>
            <input 
              type="text" 
              className="form-control border-start-0" 
              placeholder="Buscar medicamento..." 
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
                  <th className="px-4 py-3">Nombre del Medicamento</th>
                  <th className="py-3">Descripción / Presentación</th>
                  <th className="py-3 text-end px-4">Precio Unitario</th>
                </tr>
              </thead>
              <tbody>
                {filteredMeds.length > 0 ? (
                  filteredMeds.map(m => (
                    <tr key={m.id}>
                      <td className="px-4 py-3 fw-bold">{m.nombre}</td>
                      <td className="py-3 text-secondary">{m.descripcion}</td>
                      <td className="py-3 text-end px-4 fw-bold text-success">
                        ${Number(m.precio).toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-5 text-muted">
                      No se encontró el medicamento: "{search}"
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