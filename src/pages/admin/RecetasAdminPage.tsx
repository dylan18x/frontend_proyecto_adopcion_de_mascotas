import { useEffect, useState } from "react";
import { api } from "../../services/api";

export default function Recetas() {
  const [recetas, setRecetas] = useState<any[]>([]);
  const [consultas, setConsultas] = useState<any[]>([]);
  const [medicamentos, setMedicamentos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    dosis: "",
    duracion: "",
    consultaId: "",
    medicamentoId: ""
  });

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const [resR, resC, resM] = await Promise.all([
        api.get("/recetas"),
        api.get("/consultas"),
        api.get("/medicamentos")
      ]);
      setRecetas(resR.data.items || resR.data || []);
      setConsultas(resC.data.items || resC.data || []);
      setMedicamentos(resM.data.items || resM.data || []);
    } catch (error) {
      console.error("Error cargando datos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { cargarDatos(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consultaId || !formData.medicamentoId) {
      return alert("Por favor selecciona una consulta y un medicamento");
    }

    try {
      if (editId) {
        // CAMBIO AQUÍ: Se usa PUT en lugar de PATCH para coincidir con tu Backend
        await api.put(`/recetas/${editId}`, formData);
        alert("¡Receta actualizada con éxito!");
      } else {
        await api.post("/recetas", formData);
        alert("¡Receta guardada con éxito!");
      }
      cancelarEdicion();
      cargarDatos();
    } catch (error: any) {
      console.error("Error en la petición:", error.response?.data);
      alert(error.response?.data?.message || "Error al procesar la receta");
    }
  };

  const prepararEdicion = (r: any) => {
    setEditId(r.id);
    setFormData({
      dosis: r.dosis || "",
      duracion: r.duracion || "",
      consultaId: r.consulta?.id || r.consultaId || "",
      medicamentoId: r.medicamento?.id || r.medicamentoId || ""
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelarEdicion = () => {
    setEditId(null);
    setFormData({ dosis: "", duracion: "", consultaId: "", medicamentoId: "" });
  };

  const eliminarReceta = async (id: string) => {
    if (!confirm("¿Seguro que deseas eliminar esta receta?")) return;
    try {
      await api.delete(`/recetas/${id}`);
      cargarDatos();
    } catch (error) {
      alert("No se pudo eliminar la receta");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-danger fw-bold text-center">📋 Gestión de Recetas Médicas</h2>

      <div className={`card p-4 mb-4 shadow border-0 ${editId ? 'border-start border-warning border-5' : 'bg-light'}`}>
        <h4 className={editId ? "text-warning" : "text-danger"}>
          {editId ? "✏️ Editando Registro" : "➕ Nueva Receta"}
        </h4>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-bold">Consulta (Diagnóstico)</label>
            <select className="form-select" value={formData.consultaId} required
              onChange={(e) => setFormData({...formData, consultaId: e.target.value})}>
              <option value="">-- Seleccionar Consulta --</option>
              {consultas.map(c => (
                <option key={c.id} value={c.id}>{c.diagnostico || `ID: ${c.id.substring(0,5)}`}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Medicamento</label>
            <select className="form-select" value={formData.medicamentoId} required
              onChange={(e) => setFormData({...formData, medicamentoId: e.target.value})}>
              <option value="">-- Seleccionar Medicamento --</option>
              {medicamentos.map(m => (
                <option key={m.id} value={m.id}>{m.nombre}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Dosis</label>
            <input type="text" className="form-control" placeholder="Ej: 1 tableta cada 8h"
              value={formData.dosis} onChange={(e) => setFormData({...formData, dosis: e.target.value})} required />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Duración</label>
            <input type="text" className="form-control" placeholder="Ej: 7 días"
              value={formData.duracion} onChange={(e) => setFormData({...formData, duracion: e.target.value})} required />
          </div>

          <div className="col-12 text-end mt-3 gap-2 d-flex justify-content-end">
            {editId && (
              <button type="button" className="btn btn-outline-secondary px-4 fw-bold" onClick={cancelarEdicion}>
                CANCELAR
              </button>
            )}
            <button type="submit" className={`btn ${editId ? 'btn-warning' : 'btn-danger'} px-5 fw-bold text-white shadow-sm`}>
              {editId ? "ACTUALIZAR" : "GUARDAR RECETA"}
            </button>
          </div>
        </form>
      </div>

      <div className="table-responsive bg-white rounded shadow-sm">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-danger">
            <tr>
              <th>Medicamento</th>
              <th>Dosis</th>
              <th>Duración</th>
              <th>Diagnóstico</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="text-center py-4">Cargando...</td></tr>
            ) : recetas.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-4">No hay recetas registradas</td></tr>
            ) : (
              recetas.map((r) => (
                <tr key={r.id}>
                  <td className="fw-bold text-primary">{r.medicamento?.nombre || 'N/A'}</td>
                  <td>{r.dosis}</td>
                  <td>{r.duracion}</td>
                  <td><span className="badge bg-light text-dark border">{r.consulta?.diagnostico || 'S/D'}</span></td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-warning me-2" onClick={() => prepararEdicion(r)}>
                      Editar
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarReceta(r.id)}>
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