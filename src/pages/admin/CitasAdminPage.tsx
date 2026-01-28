import { useEffect, useState } from "react";
import { getCitas, createCita, deleteCita } from "../../services/citas.service";
import { getMascotas } from "../../services/mascotas.service";
import { getVeterinarios } from "../../services/veterinarios.service";

export default function CitasAdminPage() {
  const [citas, setCitas] = useState<any[]>([]);
  const [mascotas, setMascotas] = useState<any[]>([]);
  const [veterinarios, setVeterinarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    fecha: "",
    hora: "",
    motivo: "",
    id_mascota: "",
    id_veterinario: ""
  });

  // Función de limpieza para asegurar que siempre tengamos un array
  const extraer = (res: any) => {
    const data = res?.data || res;
    return data?.items || (Array.isArray(data) ? data : []);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // Usamos .catch en cada una para que si una falla, las otras carguen
      const [resC, resM, resV] = await Promise.all([
        getCitas().catch(() => ({ items: [] })),
        getMascotas().catch(() => ({ items: [] })),
        getVeterinarios().catch(() => ({ items: [] }))
      ]);

      setCitas(extraer(resC));
      setMascotas(extraer(resM));
      setVeterinarios(extraer(resV));
    } catch (err) {
      console.error("Error cargando datos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCita(formData);
      alert("✅ Cita agendada correctamente");
      setFormData({ fecha: "", hora: "", motivo: "", id_mascota: "", id_veterinario: "" });
      fetchData(); // Recarga para traer los nombres desde el backend
    } catch (err) {
      alert("❌ Error al guardar. Verifica los datos.");
    }
  };

  if (loading) return <div className="p-5 text-center fw-bold">Sincronizando con la clínica...</div>;

  return (
    <div className="container py-4">
      <h2 className="text-center fw-bold mb-4" style={{ color: "#d63344" }}>
        📋 Gestión de Citas
      </h2>

      {/* FORMULARIO */}
      <div className="card border-0 shadow-sm mb-4 p-4 rounded-3">
        <form onSubmit={handleSave} className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-bold small">Mascota</label>
            <select 
              className="form-select" 
              value={formData.id_mascota} 
              required 
              onChange={e => setFormData({...formData, id_mascota: e.target.value})}
            >
              <option value="">Seleccione Mascota</option>
              {mascotas.map((m: any) => (
                <option key={m.id_mascota || m.id} value={m.id_mascota || m.id}>
                  {m.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold small">Veterinario</label>
            <select 
              className="form-select" 
              value={formData.id_veterinario} 
              required 
              onChange={e => setFormData({...formData, id_veterinario: e.target.value})}
            >
              <option value="">Seleccione Veterinario</option>
              {veterinarios.map((v: any) => (
                <option key={v.id_veterinario || v.id} value={v.id_veterinario || v.id}>
                  {v.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <input type="date" className="form-control" value={formData.fecha} required onChange={e => setFormData({...formData, fecha: e.target.value})} />
          </div>
          <div className="col-md-4">
            <input type="time" className="form-control" value={formData.hora} required onChange={e => setFormData({...formData, hora: e.target.value})} />
          </div>
          <div className="col-md-4">
            <input type="text" className="form-control" placeholder="Motivo" value={formData.motivo} required onChange={e => setFormData({...formData, motivo: e.target.value})} />
          </div>

          <div className="col-12 text-end">
            <button type="submit" className="btn text-white px-5 fw-bold" style={{ backgroundColor: "#d63344" }}>
              GUARDAR
            </button>
          </div>
        </form>
      </div>

      {/* TABLA */}
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
        <table className="table table-hover mb-0 align-middle">
          <thead style={{ backgroundColor: "#fbe9eb" }}>
            <tr>
              <th className="ps-4 py-3">Mascota</th>
              <th className="py-3">Veterinario</th>
              <th className="py-3">Fecha/Hora</th>
              <th className="py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((c: any) => (
              <tr key={c.id_cita}>
                <td className="ps-4 fw-bold">{c.mascota?.nombre || 'Desconocida'}</td>
                <td>Dr. {c.veterinario?.nombre || 'No asignado'}</td>
                <td>{c.fecha} {c.hora}</td>
                <td className="text-center">
                  <button 
                    className="btn btn-sm text-danger border-0" 
                    onClick={() => { if(confirm("¿Borrar?")) deleteCita(c.id_cita).then(fetchData) }}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}