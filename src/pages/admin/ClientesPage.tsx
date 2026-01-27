import { useEffect, useState, useMemo } from "react";
import { getClients, deleteClient, updateClient, createClient, type ClientDto } from "../../services/clientes.service";

export default function ClientesPage() {
  const [clients, setClients] = useState<ClientDto[]>([]);
  const [search, setSearch] = useState("");

  // Campos del formulario para añadir
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<Omit<ClientDto, "id"> | null>(null);

  const loadClients = () => getClients().then(data => setClients(data));

  useEffect(() => { loadClients(); }, []);

  const filteredClients = useMemo(() => {
    return clients.filter(c =>
      c.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      c.cedula?.includes(search)
    );
  }, [clients, search]);

  const handleAdd = async () => {
    if (!nombre || !cedula || !telefono || !direccion) return;
    await createClient({ nombre, cedula, telefono, direccion });
    setNombre(""); setCedula(""); setTelefono(""); setDireccion("");
    loadClients();
  };

  const startEdit = (c: ClientDto) => {
    setEditingId(c.id);
    setEditingData({ nombre: c.nombre, cedula: c.cedula, telefono: c.telefono, direccion: c.direccion });
  };

  const handleSaveEdit = async () => {
    if (!editingId || !editingData) return;
    await updateClient(editingId, editingData);
    setEditingId(null);
    setEditingData(null);
    loadClients();
  };

  const handleDelete = async (id: string) => {
    await deleteClient(id);
    loadClients();
  };

  return (
    <div className="container py-5">
      {/* Formulario Añadir */}
      <div className="row mb-4 align-items-center">
        <div className="col-md-2"><input className="form-control" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} /></div>
        <div className="col-md-2"><input className="form-control" placeholder="Cédula" value={cedula} onChange={e => setCedula(e.target.value)} /></div>
        <div className="col-md-2"><input className="form-control" placeholder="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} /></div>
        <div className="col-md-3"><input className="form-control" placeholder="Dirección" value={direccion} onChange={e => setDireccion(e.target.value)} /></div>
        <div className="col-md-3"><button className="btn btn-success" onClick={handleAdd}>Añadir Cliente</button></div>
      </div>

      {/* Buscador */}
      <div className="row mb-3">
        <div className="col-md-4">
          <input className="form-control" placeholder="Buscar por nombre o cédula..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Tabla */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead style={{ backgroundColor: '#d8f3dc' }}>
                <tr>
                  <th>Nombre</th>
                  <th>Cédula</th>
                  <th>Teléfono</th>
                  <th>Dirección</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map(c => (
                  <tr key={c.id}>
                    <td>
                      {editingId === c.id ? 
                        <input className="form-control" value={editingData?.nombre || ""} onChange={e => setEditingData({...editingData!, nombre: e.target.value})} /> 
                        : c.nombre
                      }
                    </td>
                    <td>
                      {editingId === c.id ? 
                        <input className="form-control" value={editingData?.cedula || ""} onChange={e => setEditingData({...editingData!, cedula: e.target.value})} /> 
                        : c.cedula
                      }
                    </td>
                    <td>
                      {editingId === c.id ? 
                        <input className="form-control" value={editingData?.telefono || ""} onChange={e => setEditingData({...editingData!, telefono: e.target.value})} /> 
                        : c.telefono
                      }
                    </td>
                    <td>
                      {editingId === c.id ? 
                        <input className="form-control" value={editingData?.direccion || ""} onChange={e => setEditingData({...editingData!, direccion: e.target.value})} /> 
                        : c.direccion
                      }
                    </td>
                    <td className="d-flex gap-2">
                      {editingId === c.id ? (
                        <>
                          <button className="btn btn-sm btn-primary" onClick={handleSaveEdit}>Guardar</button>
                          <button className="btn btn-sm btn-secondary" onClick={() => setEditingId(null)}>Cancelar</button>
                        </>
                      ) : (
                        <>
                          <button className="btn btn-sm btn-primary" onClick={() => startEdit(c)}>Editar</button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(c.id)}>Eliminar</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
