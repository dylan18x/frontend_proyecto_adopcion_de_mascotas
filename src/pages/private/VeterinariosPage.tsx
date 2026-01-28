import { useEffect, useState, useMemo } from "react";
import { 
  getVeterinarios, 
  deleteVeterinario, 
  updateVeterinario, 
  createVeterinario, 
  type VeterinarioDto 
} from "../../services/veterinarios.service";
import { useAuth } from "../../context/AuthContext";

export default function VeterinariosPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const [vets, setVets] = useState<VeterinarioDto[]>([]);
  const [search, setSearch] = useState("");

  const [nombre, setNombre] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [telefono, setTelefono] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<Omit<VeterinarioDto, "id"> | null>(null);

  const loadVets = () => getVeterinarios().then(data => setVets(data));

  useEffect(() => { loadVets(); }, []);

  const filteredVets = useMemo(() => {
    return vets.filter(v =>
      v.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      v.especialidad?.toLowerCase().includes(search.toLowerCase())
    );
  }, [vets, search]);

  const handleAdd = async () => {
    if (!nombre || !especialidad || !telefono) return;
    await createVeterinario({ nombre, especialidad, telefono });
    setNombre(""); setEspecialidad(""); setTelefono("");
    loadVets();
  };

  const startEdit = (v: VeterinarioDto) => {
    setEditingId(v.id);
    setEditingData({ nombre: v.nombre, especialidad: v.especialidad, telefono: v.telefono });
  };

  const handleSaveEdit = async () => {
    if (!editingId || !editingData) return;
    await updateVeterinario(editingId, editingData);
    setEditingId(null);
    setEditingData(null);
    loadVets();
  };

  const handleDelete = async (id: string) => {
    setVets(prev => prev.filter(v => v.id !== id));
    deleteVeterinario(id).catch(() => loadVets());
  };

  return (
    <div className="container py-5">
      <h3 className="text-success mb-4">Directorio de Veterinarios</h3>

      {isAdmin && (
        <div className="row mb-4 align-items-center">
          <div className="col-md-3"><input className="form-control" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} /></div>
          <div className="col-md-3"><input className="form-control" placeholder="Especialidad" value={especialidad} onChange={e => setEspecialidad(e.target.value)} /></div>
          <div className="col-md-3"><input className="form-control" placeholder="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} /></div>
          <div className="col-md-3"><button className="btn btn-success w-100" onClick={handleAdd}>Añadir Veterinario</button></div>
        </div>
      )}

      <div className="row mb-3">
        <div className="col-md-4">
          <input className="form-control" placeholder="Buscar por nombre o especialidad..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead style={{ backgroundColor: '#d8f3dc' }}>
                <tr>
                  <th>Nombre</th>
                  <th>Especialidad</th>
                  <th>Teléfono</th>
                  {isAdmin && <th>Acciones</th>}
                </tr>
              </thead>
              <tbody>
                {filteredVets.map(v => (
                  <tr key={v.id}>
                    <td>
                      {editingId === v.id ? 
                        <input className="form-control" value={editingData?.nombre || ""} onChange={e => setEditingData({...editingData!, nombre: e.target.value})} /> 
                        : v.nombre
                      }
                    </td>
                    <td>
                      {editingId === v.id ? 
                        <input className="form-control" value={editingData?.especialidad || ""} onChange={e => setEditingData({...editingData!, especialidad: e.target.value})} /> 
                        : v.especialidad
                      }
                    </td>
                    <td>
                      {editingId === v.id ? 
                        <input className="form-control" value={editingData?.telefono || ""} onChange={e => setEditingData({...editingData!, telefono: e.target.value})} /> 
                        : v.telefono
                      }
                    </td>
                    {isAdmin && (
                      <td className="d-flex gap-2">
                        {editingId === v.id ? (
                          <>
                            <button className="btn btn-sm btn-primary" onClick={handleSaveEdit}>Guardar</button>
                            <button className="btn btn-sm btn-secondary" onClick={() => setEditingId(null)}>Cancelar</button>
                          </>
                        ) : (
                          <>
                            <button className="btn btn-sm btn-primary" onClick={() => startEdit(v)}>Editar</button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(v.id)}>Eliminar</button>
                          </>
                        )}
                      </td>
                    )}
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