import { useEffect, useState, useMemo } from "react";
import { getClients, type ClientDto } from "../../services/clientes.service";

export default function ClientsPage() {
  const [clients, setClients] = useState<ClientDto[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getClients().then((data) => {
      if (data) setClients(data);
    });
  }, []);

  const filteredClients = useMemo(() => {
    const list = clients || [];
    return list.filter(c => 
      c.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      c.cedula?.includes(search)
    );
  }, [clients, search]);

  return (
    <div className="container py-5">
      <div className="row mb-4 align-items-center">
        <div className="col-md-7">
          <h1 className="h2" style={{ color: '#2d6a4f' }}>
            🌿 Clientes que Adoptaron
          </h1>
          <p className="text-muted">Gestion de las personas que buscaron un animalito</p>
        </div>
        <div className="col-md-5">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-white border-end-0">
              🔍
            </span>
            <input 
              type="text" 
              className="form-control border-start-0" 
              placeholder="Buscar por nombre o identificación..." 
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
                  <th className="px-4 py-3">Nombre Completo</th>
                  <th className="py-3">Cédula</th>
                  <th className="py-3">Teléfono</th>
                  <th className="py-3">Dirección de Vivienda</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.length > 0 ? (
                  filteredClients.map(c => (
                    <tr key={c.id}>
                      <td className="px-4 py-3 fw-semibold">{c.nombre}</td>
                      <td className="py-3 text-secondary">{c.cedula}</td>
                      <td className="py-3">{c.telefono}</td>
                      <td className="py-3">{c.direccion}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-5 text-muted">
                      No se encontraron adoptantes con el criterio: "{search}"
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