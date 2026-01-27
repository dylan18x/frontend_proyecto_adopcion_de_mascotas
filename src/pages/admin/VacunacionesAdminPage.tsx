import { useEffect, useState } from "react";
import { api } from "../../services/api";

export default function VacunacionesAdminPage() {
  const [vacunaciones, setVacunaciones] = useState<any[]>([]);
  const [mascotas, setMascotas] = useState<any[]>([]);
  const [vacunas, setVacunas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fecha: new Date().toISOString().split('T')[0],
    mascotaId: "",
    vacunaId: ""
  });

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [resV, resM, resCat] = await Promise.all([
        api.get("/vacunaciones"),
        api.get("/mascotas"),
        api.get("/vacunas")
      ]);
      setVacunaciones(resV.data.items || resV.data || []);
      setMascotas(resM.data.items || resM.data || []);
      setVacunas(resCat.data.items || resCat.data || []);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  useEffect(() => { cargarDatos(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // PAYLOAD LIMPIO para el DTO (Evita el Error 400)
    const payload = {
      fecha: new Date(formData.fecha).toISOString(),
      mascotaId: formData.mascotaId,
      vacunaId: formData.vacunaId
    };

    try {
      if (editId) {
        await api.put(`/vacunaciones/${editId}`, payload);
      } else {
        await api.post("/vacunaciones", payload);
      }
      alert("Operación exitosa 🐾");
      cancelar();
      cargarDatos();
    } catch (error: any) {
      const msg = error.response?.data?.message;
      alert("Error: " + (Array.isArray(msg) ? msg.join(", ") : msg));
    }
  };

  const prepararEdicion = (v: any) => {
    setEditId(v.id);
    setFormData({
      fecha: v.fecha ? v.fecha.split('T')[0] : "",
      mascotaId: v.mascota?.id || "",
      vacunaId: v.vacuna?.id || ""
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelar = () => {
    setEditId(null);
    setFormData({ fecha: new Date().toISOString().split('T')[0], mascotaId: "", vacunaId: "" });
  };

  return (
    <div className="container mt-3">
      <div className={`card shadow-sm mb-4 border-0 ${editId ? 'border-top border-warning border-5' : 'bg-light'}`}>
        <div className="card-body">
          <h4 className="fw-bold text-primary mb-3">{editId ? "✏️ Editar" : "💉 Nueva"} Vacunación</h4>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-4">
              <label className="form-label small fw-bold">Mascota</label>
              <select className="form-select border-0 shadow-sm" value={formData.mascotaId} required
                onChange={e => setFormData({...formData, mascotaId: e.target.value})}>
                <option value="">Seleccionar...</option>
                {mascotas.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">Vacuna</label>
              <select className="form-select border-0 shadow-sm" value={formData.vacunaId} required
                onChange={e => setFormData({...formData, vacunaId: e.target.value})}>
                <option value="">Seleccionar...</option>
                {vacunas.map(v => <option key={v.id} value={v.id}>{v.nombre}</option>)}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">Fecha</label>
              <input type="date" className="form-control border-0 shadow-sm" value={formData.fecha} required
                onChange={e => setFormData({...formData, fecha: e.target.value})} />
            </div>
            <div className="col-12 text-end">
              {editId && <button type="button" className="btn btn-link text-secondary" onClick={cancelar}>Cancelar</button>}
              <button type="submit" className={`btn px-4 fw-bold ${editId ? 'btn-warning text-white' : 'btn-primary'}`}>
                {editId ? "ACTUALIZAR" : "REGISTRAR"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="table-responsive bg-white rounded shadow-sm">
        <table className="table table-hover align-middle mb-0 text-center">
          <thead className="table-dark">
            <tr><th>Mascota</th><th>Vacuna</th><th>Fecha</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {vacunaciones.map(v => (
              <tr key={v.id}>
                <td className="fw-bold">{v.mascota?.nombre}</td>
                <td><span className="badge bg-info text-dark">{v.vacuna?.nombre}</span></td>
                <td>{new Date(v.fecha).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-sm btn-outline-warning me-2" onClick={() => prepararEdicion(v)}>Editar</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={async () => {
                    if(confirm("¿Eliminar?")) { await api.delete(`/vacunaciones/${v.id}`); cargarDatos(); }
                  }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}