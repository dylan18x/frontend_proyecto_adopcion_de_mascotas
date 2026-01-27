import { useEffect, useState } from "react";
import { api } from "../../services/api";

export default function Vacunas() {
  const [vacunas, setVacunas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nombre: "",
    fabricante: ""
  });

  const cargarVacunas = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/vacunas");
      setVacunas(data.items || data || []);
    } catch (error) {
      console.error("Error al cargar vacunas", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { cargarVacunas(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/vacunas/${editId}`, formData);
        alert("Vacuna actualizada correctamente");
      } else {
        await api.post("/vacunas", formData);
        alert("Vacuna agregada con éxito");
      }
      resetForm();
      cargarVacunas();
    } catch (error) {
      alert("Error en la operación. Revisa la consola.");
    }
  };

  const prepararEdicion = (v: any) => {
    setEditId(v.id);
    setFormData({
      nombre: v.nombre,
      fabricante: v.fabricante
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const eliminarVacuna = async (id: string) => {
    if (!confirm("¿Seguro que deseas eliminar esta vacuna?")) return;
    try {
      await api.delete(`/vacunas/${id}`);
      cargarVacunas();
    } catch (error) {
      alert("No se pudo eliminar la vacuna");
    }
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({ nombre: "", fabricante: "" });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary fw-bold">💉 Gestión de Vacunas</h2>

      <div className={`card p-4 mb-4 shadow-sm border-0 ${editId ? 'border-start border-warning border-5' : 'bg-light'}`}>
        <h5 className={editId ? "text-warning" : "text-primary"}>
          {editId ? "✏️ Modificar Vacuna" : "➕ Registrar Nueva Vacuna"}
        </h5>
        <form onSubmit={handleSubmit} className="row g-3 mt-1">
          <div className="col-md-5">
            <label className="form-label fw-bold small">Nombre de la Vacuna</label>
            <input 
              type="text" className="form-control" 
              placeholder="Ej: Parvovirus"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              required 
            />
          </div>
          <div className="col-md-5">
            <label className="form-label fw-bold small">Fabricante / Laboratorio</label>
            <input 
              type="text" className="form-control" 
              placeholder="Ej: Pfizer Animal Health"
              value={formData.fabricante}
              onChange={(e) => setFormData({...formData, fabricante: e.target.value})}
              required 
            />
          </div>
          <div className="col-md-2 d-flex align-items-end gap-2">
            <button type="submit" className={`btn w-100 fw-bold ${editId ? 'btn-warning' : 'btn-primary'}`}>
              {editId ? "LISTO" : "AGREGAR"}
            </button>
            {editId && (
              <button type="button" className="btn btn-secondary" onClick={resetForm}>X</button>
            )}
          </div>
        </form>
      </div>

      <div className="table-responsive bg-white rounded shadow-sm">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-primary">
            <tr>
              <th>Nombre de Vacuna</th>
              <th>Fabricante / Laboratorio</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={3} className="text-center py-4">Cargando catálogo...</td></tr>
            ) : vacunas.length === 0 ? (
              <tr><td colSpan={3} className="text-center py-4">No hay vacunas registradas</td></tr>
            ) : (
              vacunas.map((v) => (
                <tr key={v.id}>
                  <td className="fw-bold">{v.nombre}</td>
                  <td>{v.fabricante}</td>
                  <td className="text-center">
                    <button 
                      className="btn btn-sm btn-outline-warning me-2"
                      onClick={() => prepararEdicion(v)}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => eliminarVacuna(v.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}