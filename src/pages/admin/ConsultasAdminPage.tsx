import { useEffect, useState } from "react";
import { api } from "../../services/api"; // O el servicio que uses para consultas
import { getMascotas } from "../../services/mascotas.service";
import { getVeterinarios } from "../../services/veterinarios.service";

export default function ConsultasAdminPage() {
  const [consultas, setConsultas] = useState<any[]>([]);
  const [mascotas, setMascotas] = useState<any[]>([]);
  const [veterinarios, setVeterinarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    id_mascota: "",
    id_veterinario: "",
    diagnostico: "",
    tratamiento: "",
    observaciones: ""
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      // Ajusta las rutas según tu backend
      const [consRes, mascRes, vetRes] = await Promise.all([
        api.get("/consulta"), 
        getMascotas(),
        getVeterinarios()
      ]);
      setConsultas(consRes.data);
      setMascotas(mascRes);
      setVeterinarios(vetRes);
    } catch (err) {
      console.error("Error al cargar datos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/consulta", formData);
      fetchData();
      setFormData({ id_mascota: "", id_veterinario: "", diagnostico: "", tratamiento: "", observaciones: "" });
      alert("Consulta registrada con éxito");
    } catch (err) {
      alert("Error al registrar la consulta.");
    }
  };

  if (loading) return <div className="p-5 text-center">Cargando consultas...</div>;

  return (
    <div className="container py-4">
      <h2 className="text-center fw-bold mb-4" style={{ color: "#d63344" }}>
        🩺 Control de Consultas Médicas
      </h2>

      {/* FORMULARIO SUPERIOR */}
      <div className="card border-0 shadow-sm mb-4 rounded-3">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-3" style={{ color: "#d63344" }}>+ Nueva Consulta</h5>
          <form onSubmit={handleSave}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-bold small">Paciente (Mascota)</label>
                <select className="form-select" value={formData.id_mascota} required onChange={e => setFormData({...formData, id_mascota: e.target.value})}>
                  <option value="">-- Seleccionar --</option>
                  {mascotas.map(m => <option key={m.id_mascota} value={m.id_mascota}>{m.nombre}</option>)}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold small">Atendido por</label>
                <select className="form-select" value={formData.id_veterinario} required onChange={e => setFormData({...formData, id_veterinario: e.target.value})}>
                  <option value="">-- Seleccionar --</option>
                  {veterinarios.map(v => <option key={v.id_veterinario} value={v.id_veterinario}>{v.nombre}</option>)}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold small">Diagnóstico</label>
                <input type="text" className="form-control" placeholder="Ej: Gastritis leve" value={formData.diagnostico} required onChange={e => setFormData({...formData, diagnostico: e.target.value})} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold small">Tratamiento</label>
                <input type="text" className="form-control" placeholder="Ej: Dieta blanda" value={formData.tratamiento} required onChange={e => setFormData({...formData, tratamiento: e.target.value})} />
              </div>
              <div className="col-12">
                <label className="form-label fw-bold small">Observaciones adicionales</label>
                <textarea className="form-control" rows={2} value={formData.observaciones} onChange={e => setFormData({...formData, observaciones: e.target.value})}></textarea>
              </div>
              <div className="col-12 text-end mt-3">
                <button type="submit" className="btn text-white fw-bold px-4" style={{ backgroundColor: "#d63344" }}>
                  REGISTRAR CONSULTA
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* TABLA INFERIOR */}
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead style={{ backgroundColor: "#fbe9eb" }}>
              <tr>
                <th className="py-3 ps-4">Mascota</th>
                <th className="py-3">Veterinario</th>
                <th className="py-3">Diagnóstico</th>
                <th className="py-3">Fecha</th>
                <th className="py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {consultas.map((c) => (
                <tr key={c.id_consulta}>
                  <td className="ps-4 fw-bold">{c.mascota?.nombre}</td>
                  <td>{c.veterinario?.nombre}</td>
                  <td>{c.diagnostico}</td>
                  <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-secondary border-0">👁️ Ver</button>
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