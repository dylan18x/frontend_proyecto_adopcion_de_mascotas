import { useEffect, useState, useMemo } from "react";
import { getCitas, type CitaDto } from "../../services/citas.service";

export default function CitasPage() {
  const [citas, setCitas] = useState<CitaDto[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getCitas().then((data) => {
      if (data) setCitas(data);
    });
  }, []);

  const filteredCitas = useMemo(() => {
    const list = citas || [];
    return list.filter(c => 
      c.motivo?.toLowerCase().includes(search.toLowerCase()) ||
      c.fecha?.includes(search) || 
      c.mascota?.nombre?.toLowerCase().includes(search.toLowerCase())
    );
  }, [citas, search]);

  return (
    <div className="container py-5">
      <div className="row mb-4 align-items-center">
        <div className="col-md-7">
          <h1 className="h2" style={{ color: '#2d6a4f' }}>
            📅 Agenda de Citas
          </h1>
          <p className="text-muted">Control de horarios y visitas programadas</p>
        </div>
        <div className="col-md-5">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-white border-end-0">🔍</span>
            <input 
              type="text" 
              className="form-control border-start-0" 
              placeholder="Buscar por motivo, fecha o mascota..." 
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
                  <th className="px-4 py-3">Fecha</th>
                  <th className="py-3">Hora</th>
                  <th className="py-3">Motivo de Visita</th>
                  <th className="py-3">Mascota</th>
                  <th className="py-3">Veterinario</th>
                </tr>
              </thead>
              <tbody>
                {filteredCitas.length > 0 ? (
                  filteredCitas.map(c => (
                    <tr key={c.id}>
                      <td className="px-4 py-3 fw-bold text-success">{c.fecha}</td>
                      <td className="py-3"><span className="badge bg-light text-dark border">{c.hora}</span></td>
                      <td className="py-3 fw-semibold">{c.motivo}</td>
                      {/* Aquí mostramos el nombre si viene del backend, si no, un guion */}
                      <td className="py-3">{c.mascota?.nombre || 'Mascota'}</td>
                      <td className="py-3">{c.veterinario?.nombre || 'Dr. Asignado'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-5 text-muted">
                      No hay citas que coincidan con: "{search}"
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