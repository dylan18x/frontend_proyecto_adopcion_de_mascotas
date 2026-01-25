import { useEffect, useState, useMemo } from "react";
import { getVacunas, type VacunaDto } from "../../services/vacunas.service";

export default function VacunasPage() {
  const [vacunas, setVacunas] = useState<VacunaDto[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getVacunas().then((data) => {
      if (data) setVacunas(data);
    });
  }, []);

  const filteredVacunas = useMemo(() => {
    const list = vacunas || [];
    return list.filter(v => 
      v.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      v.fabricante?.toLowerCase().includes(search.toLowerCase())
    );
  }, [vacunas, search]);

  return (
    <div className="container py-5">
      <div className="row mb-4 align-items-center">
        <div className="col-md-7">
          <h1 className="h2" style={{ color: '#2d6a4f' }}>💉 Catálogo de Vacunas</h1>
          <p className="text-muted">Listado de biológicos disponibles.</p>
        </div>
        <div className="col-md-5">
          <input 
            type="text" 
            className="form-control shadow-sm" 
            placeholder="Buscar por nombre o fabricante..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead style={{ backgroundColor: '#d8f3dc' }}>
              <tr>
                <th className="px-4 py-3">Nombre de la Vacuna</th>
                <th className="py-3">Fabricante / Laboratorio</th>
              </tr>
            </thead>
            <tbody>
              {filteredVacunas.map(v => (
                <tr key={v.id}>
                  <td className="px-4 py-3 fw-bold">{v.nombre}</td>
                  <td className="py-3">
                    <span className="badge rounded-pill bg-info text-dark">
                      {v.fabricante}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}