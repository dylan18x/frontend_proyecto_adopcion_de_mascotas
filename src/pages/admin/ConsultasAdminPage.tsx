import { useEffect, useState } from "react";
import { api } from "../../services/api"; 
import { getCitas } from "../../services/citas.service";

export default function ConsultasAdminPage() {
  const [consultas, setConsultas] = useState<any[]>([]);
  const [citas, setCitas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    id_cita: "", 
    diagnostico: "",
    tratamiento: "",
    observaciones: ""
  });

  const extraer = (res: any) => {
    const base = res?.data || res;
    return base?.items || (Array.isArray(base) ? base : []);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // Cargamos consultas y citas simultáneamente
      const [consRes, citasRes] = await Promise.all([
        api.get("/consultas"), 
        getCitas()
      ]);
      
      setConsultas(extraer(consRes));
      setCitas(extraer(citasRes));
    } catch (err) {
      console.error("Error al conectar con la base remota:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación de seguridad
    if (!formData.id_cita) return alert("Selecciona una cita válida");

    try {
      // Enviamos el POST limpio a /consultas
      await api.post("/consultas", formData);
      alert("✅ Consulta registrada con éxito");
      
      // Limpiamos y refrescamos para ver los cambios
      setFormData({ id_cita: "", diagnostico: "", tratamiento: "", observaciones: "" });
      await fetchData();
    } catch (err: any) {
      console.error("Error 500 detectado:", err.response?.data);
      alert("Error 500: Revisa que esta cita no tenga ya una consulta asignada (Relación 1 a 1).");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Deseas eliminar este historial médico?")) return;
    try {
      await api.delete(`/consultas/${id}`);
      fetchData();
    } catch (err) {
      alert("No se pudo eliminar el registro.");
    }
  };

  if (loading) return <div className="p-5 text-center fw-bold text-danger">Sincronizando con el servidor de tu compañero...</div>;

  return (
    <div className="container py-4">
      <h2 className="text-center fw-bold mb-4" style={{ color: "#d63344" }}>
        🩺 Control de Consultas Médicas
      </h2>

      {/* FORMULARIO DE REGISTRO */}
      <div className="card border-0 shadow-sm mb-4 p-4 rounded-3 bg-white">
        <h5 className="fw-bold mb-3" style={{ color: "#d63344" }}>+ Nueva Consulta</h5>
        <form onSubmit={handleSave} className="row g-3">
          <div className="col-md-12">
            <label className="form-label fw-bold small">Cita Médica / Paciente</label>
            <select 
              className="form-select" 
              value={formData.id_cita} 
              required 
              onChange={e => setFormData({...formData, id_cita: e.target.value})}
            >
              <option value="">-- Seleccione la cita del paciente --</option>
              {citas.map((cita: any) => (
                <option key={cita.id_cita || cita.id} value={cita.id_cita || cita.id}>
                  {cita.mascota?.nombre || 'Mascota'} - {cita.fecha} ({cita.motivo})
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold small">Diagnóstico</label>
            <input type="text" className="form-control" placeholder="Ej: Infección leve" value={formData.diagnostico} required onChange={e => setFormData({...formData, diagnostico: e.target.value})} />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold small">Tratamiento</label>
            <input type="text" className="form-control" placeholder="Ej: Antibiótico cada 8h" value={formData.tratamiento} required onChange={e => setFormData({...formData, tratamiento: e.target.value})} />
          </div>
          <div className="col-12 text-end mt-3">
            <button type="submit" className="btn text-white fw-bold px-5" style={{ backgroundColor: "#d63344" }}>
              REGISTRAR CONSULTA
            </button>
          </div>
        </form>
      </div>

      {/* TABLA DE HISTORIAL */}
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead style={{ backgroundColor: "#fbe9eb" }}>
              <tr>
                <th className="ps-4 py-3">Paciente (Desde Cita)</th>
                <th className="py-3">Diagnóstico</th>
                <th className="py-3">Tratamiento</th>
                <th className="py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {consultas.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-4 text-muted">No hay consultas en la base compartida.</td></tr>
              ) : (
                consultas.map((con: any) => {
                  // CRUCE DE DATOS: Buscamos la cita que tiene el mismo ID que la consulta
                  const citaEncontrada = citas.find(c => (c.id_cita === con.id_cita || c.id === con.id_cita));

                  return (
                    <tr key={con.id}>
                      <td className="ps-4 fw-bold text-primary">
                        {/* Mostramos el nombre de la mascota buscando en la cita encontrada */}
                        {citaEncontrada?.mascota?.nombre || con.cita?.mascota?.nombre || "Cita sin nombre"}
                      </td>
                      <td>{con.diagnostico}</td>
                      <td>{con.tratamiento}</td>
                      <td className="text-center">
                        <button className="btn btn-sm text-danger border-0" onClick={() => handleDelete(con.id)}>
                          🗑️ Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}