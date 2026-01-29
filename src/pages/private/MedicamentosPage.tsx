import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { 
  getMedicamentos, createMedicamento, updateMedicamento, deleteMedicamento, 
  type MedicamentoDto 
} from "../../services/medicamentos.service";

export default function MedicamentosPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const [meds, setMeds] = useState<MedicamentoDto[]>([]);
  const [search, setSearch] = useState("");

  // Inputs para crear o editar
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState<number>(0);

  const [editingId, setEditingId] = useState<string | null>(null);

  // Cargar medicamentos
  const loadMeds = async () => {
    const data = await getMedicamentos();
    setMeds(data || []);
  };

  useEffect(() => {
    loadMeds();
  }, []);

  const filteredMeds = useMemo(() => {
    return meds.filter(m =>
      m.nombre.toLowerCase().includes(search.toLowerCase()) ||
      m.descripcion.toLowerCase().includes(search.toLowerCase())
    );
  }, [meds, search]);

  // Añadir medicamento
  const handleAdd = async () => {
    if (!nombre || !descripcion || precio <= 0) return;
    await createMedicamento({ nombre, descripcion, precio });
    setNombre(""); setDescripcion(""); setPrecio(0);
    loadMeds();
  };

  // Empezar a editar
  const startEdit = (m: MedicamentoDto) => {
    setEditingId(m.id);
    setNombre(m.nombre);
    setDescripcion(m.descripcion);
    setPrecio(m.precio);
  };

  // Guardar edición
  const saveEdit = async () => {
    if (!editingId) return;
    await updateMedicamento(editingId, { nombre, descripcion, precio });
    setEditingId(null);
    setNombre(""); setDescripcion(""); setPrecio(0);
    loadMeds();
  };

  // Eliminar
  const handleDelete = async (id: string) => {
    setMeds(prev => prev.filter(m => m.id !== id));
    deleteMedicamento(id).catch(() => loadMeds());
  };

  return (
    <div className="container py-5" style={{ backgroundColor: "#f3e6d4" }}>
      
      <div className="p-4 mb-4" style={{ backgroundColor: "#2d6a4f", color: "white", borderRadius: "12px" }}>
        <h2 className="mb-2">💊 Farmacia e Inventario</h2>
        <p className="mb-0">
          Consulta los medicamentos disponibles y, si eres administrador, gestiona el inventario.
        </p>
      </div>

      {isAdmin && (
        <div className="row mb-4">
          <div className="col">
            <input className="form-control" placeholder="Nombre"
              value={nombre} onChange={e => setNombre(e.target.value)} />
          </div>
          <div className="col">
            <input className="form-control" placeholder="Descripción"
              value={descripcion} onChange={e => setDescripcion(e.target.value)} />
          </div>
          <div className="col">
            <input className="form-control" placeholder="Precio"
              type="number" value={precio} onChange={e => setPrecio(Number(e.target.value))} />
          </div>
          <div className="col">
            {editingId ? (
              <button className="btn btn-warning w-100" onClick={saveEdit}>
                Guardar
              </button>
            ) : (
              <button className="btn btn-success w-100" onClick={handleAdd}>
                Añadir
              </button>
            )}
          </div>
        </div>
      )}

      <input className="form-control mb-3"
        placeholder="Buscar medicamento..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <table className="table table-hover">
        <thead className="table-success">
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th className="text-end">Precio</th>
            {isAdmin && <th className="text-end">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {filteredMeds.map(m => (
            <tr key={m.id}>
              <td>{m.nombre}</td>
              <td>{m.descripcion}</td>
              <td className="text-end">${Number(m.precio).toFixed(2)}</td>
              {isAdmin && (
                <td className="text-end d-flex gap-2 justify-content-end">
                  <button className="btn btn-sm btn-warning" onClick={() => startEdit(m)}>Editar</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(m.id)}>Eliminar</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
