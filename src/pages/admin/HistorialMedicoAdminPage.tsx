import { useEffect, useState } from "react";
import { api } from "../../services/api";

export default function HistorialMedicoAdminPage() {
  const [historiales, setHistoriales] = useState<any[]>([]);
  const [mascotas, setMascotas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fecha: new Date().toISOString().split("T")[0],
    descripcion: "",
    id_mascota: "",
  });

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [resM, resH] = await Promise.all([
        api.get("/mascotas"),
        api.get("/historial-medico"),
      ]);
      setMascotas(resM.data.items || resM.data || []);
      setHistoriales(resH.data.items || resH.data || []);
    } catch (error) {
      console.error("Error cargando datos médicos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/historial-medico/${editId}`, formData);
      } else {
        await api.post("/historial-medico", formData);
      }
      resetForm();
      cargarDatos();
    } catch {
      alert("Error al procesar el registro");
    }
  };

  const prepararEdicion = (h: any) => {
    setEditId(h.id_historial);
    setFormData({
      fecha: h.fecha?.split("T")[0],
      descripcion: h.descripcion,
      id_mascota: h.mascota?.id || h.id_mascota,
    });
  };

  const eliminarRegistro = async (id: string) => {
    if (!confirm("¿Eliminar este antecedente médico?")) return;
    try {
      await api.delete(`/historial-medico/${id}`);
      cargarDatos();
    } catch {
      alert("Error al eliminar");
    }
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({
      fecha: new Date().toISOString().split("T")[0],
      descripcion: "",
      id_mascota: "",
    });
  };

  return (
    <div className="container-fluid px-5 py-4">

      <div className="mb-4">
        <h2 className="fw-bold mb-1" style={{ color: "#2d5a27" }}>
          🏥 Historial Médico
        </h2>
        <p className="text-muted">
          Gestión de antecedentes clínicos de las mascotas
        </p>
      </div>

      <div className="card border-0 shadow rounded-4 mb-4">
        <div className="card-header bg-white fw-bold" style={{ color: "#4a3728" }}>
          {editId ? "Editar registro médico" : "Registrar atención médica"}
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-4">
              <label className="form-label fw-semibold">Mascota</label>
              <select
                className="form-select"
                value={formData.id_mascota}
                required
                onChange={(e) =>
                  setFormData({ ...formData, id_mascota: e.target.value })
                }
              >
                <option value="">Seleccionar mascota</option>
                {mascotas.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold">Fecha</label>
              <input
                type="date"
                className="form-control"
                value={formData.fecha}
                required
                onChange={(e) =>
                  setFormData({ ...formData, fecha: e.target.value })
                }
              />
            </div>

            <div className="col-md-5">
              <label className="form-label fw-semibold">Descripción</label>
              <textarea
                className="form-control"
                rows={1}
                placeholder="Vacunas, tratamientos, observaciones..."
                value={formData.descripcion}
                required
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
              />
            </div>

            <div className="col-12 text-end">
              {editId && (
                <button
                  type="button"
                  className="btn btn-outline-secondary me-2"
                  onClick={resetForm}
                >
                  Cancelar
                </button>
              )}
              <button
                type="submit"
                className={`btn ${
                  editId ? "btn-warning" : "btn-success"
                } fw-bold`}
              >
                {editId ? "Actualizar" : "Registrar"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card border-0 shadow rounded-4">
        <div className="card-body table-responsive p-0">
          <table className="table table-hover align-middle mb-0">
            <thead style={{ backgroundColor: "#2d5a27" }} className="text-white">
              <tr>
                <th>Mascota</th>
                <th>Fecha</th>
                <th>Descripción</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-5">
                    <div className="spinner-border text-success"></div>
                    <div className="mt-2 text-muted">
                      Cargando historial médico...
                    </div>
                  </td>
                </tr>
              ) : historiales.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-5 text-muted">
                    No existen registros médicos.
                  </td>
                </tr>
              ) : (
                historiales.map((h) => (
                  <tr key={h.id_historial}>
                    <td className="fw-bold">
                      {h.mascota?.nombre || "N/A"}
                    </td>
                    <td>
                      {new Date(h.fecha).toLocaleDateString()}
                    </td>
                    <td>{h.descripcion}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-warning me-2"
                        onClick={() => prepararEdicion(h)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => eliminarRegistro(h.id_historial)}
                      >
                        Borrar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
