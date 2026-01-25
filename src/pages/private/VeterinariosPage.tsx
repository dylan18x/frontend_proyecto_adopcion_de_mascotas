import { useEffect, useState, useMemo } from "react";
import { getVeterinarios, type VeterinarioDto } from "../../services/veterinarios.service";

export default function VeterinariosPage() {
  const [vets, setVets] = useState<VeterinarioDto[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getVeterinarios().then((data) => {
      if (data) setVets(data);
    });
  }, []);

  const filteredVets = useMemo(() => {
    const list = vets || [];
    return list.filter(v => 
      v.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      v.especialidad?.toLowerCase().includes(search.toLowerCase())
    );
  }, [vets, search]);

  return (
    <div className="container py-5">
      <div className="row mb-4 align-items-center">
        <div className="col-md-7">
          <h1 className="h2" style={{ color: '#2d6a4f' }}>
            🩺 Equipo Veterinario
          </h1>
          <p className="text-muted">Especialistas encargados del bienestar de nuestras mascotas.</p>
        </div>
        <div className="col-md-5">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-white border-end-0">🔍</span>
            <input 
              type="text" 
              className="form-control border-start-0" 
              placeholder="Buscar por nombre o especialidad..." 
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
                  <th className="px-4 py-3">Nombre del Doctor/a</th>
                  <th className="py-3">Especialidad</th>
                  <th className="py-3 text-center">Contacto Directo</th>
                </tr>
              </thead>
              <tbody>
                {filteredVets.length > 0 ? (
                  filteredVets.map(v => (
                    <tr key={v.id}>
                      <td className="px-4 py-3 fw-semibold text-dark">
                        {v.nombre}
                      </td>
                      <td className="py-3">
                        <span className="badge rounded-pill bg-light text-success border border-success">
                          {v.especialidad}
                        </span>
                      </td>
                      <td className="py-3 text-center text-secondary">
                        {v.telefono}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-5 text-muted">
                      No se encontraron especialistas registrados.
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