import { useEffect, useState } from "react";
import { api } from "../../services/api";
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

  // Limpiador de datos (maneja arrays simples o paginados)
  const extraer = (res: any) => {
    const data = res?.data || res;
    return data?.items || (Array.isArray(data) ? data : []);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resC, resM, resV] = await Promise.all([
        api.get("/citas"),
        getMascotas(),
        getVeterinarios()
      ]);

      setCitas(extraer(resC));
      setMascotas(extraer(resM));
      setVeterinarios(extraer(resV));
    } catch (err) {
      console.error("Error cargando base compartida:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/citas", formData);
      alert("✅ Cita guardada correctamente");
      // Limpiamos y refrescamos todo
      setFormData({ fecha: "", hora: "", motivo: "", id_mascota: "", id_veterinario: "" });
      await fetchData(); 
    } catch (err) {
      alert("❌ Error al guardar. Verifica la conexión con la PC de tu compañero.");
    }
  };

  if (loading) return <div className="p-5 text-center fw-bold text-danger">Sincronizando con el servidor remoto...</div>;

  return (
    <div className="container py-4">
      <h2 className="text-center fw-bold mb-4" style={{ color: "#d63344" }}>
        📅 Gestión de Citas
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
              <option value="">Seleccione Especialista</option>
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
            <input type="text" className="form-control" placeholder="Motivo de la cita" value={formData.motivo} required onChange={e => setFormData({...formData, motivo: e.target.value})} />
          </div>

          <div className="col-12 text-end">
            <button type="submit" className="btn text-white px-5 fw-bold" style={{ backgroundColor: "#d63344" }}>
              GUARDAR CITA
            </button>
          </div>
        </form>
      </div>

      {/* TABLA CON CRUCE DE DATOS */}
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
        <table className="table table-hover mb-0 align-middle">
          <thead style={{ backgroundColor: "#fbe9eb" }}>
            <tr>
              <th className="ps-4 py-3">Paciente</th>
              <th className="py-3">Especialista</th>
              <th className="py-3">Fecha y Hora</th>
              <th className="py-3">Motivo</th>
              <th className="py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((c: any) => {
              // BUSCAMOS LOS NOMBRES MANUALMENTE EN NUESTRAS LISTAS
              const mascotaEncontrada = mascotas.find(m => (m.id_mascota === c.id_mascota || m.id === c.id_mascota));
              const veterinarioEncontrado = veterinarios.find(v => (v.id_veterinario === c.id_veterinario || v.id === c.id_veterinario));

              return (
                <tr key={c.id_cita || c.id}>
                  <td className="ps-4 fw-bold">
                    {/* Primero intentamos ver si el backend mandó el objeto, si no, lo buscamos en la lista local */}
                    {c.mascota?.nombre || mascotaEncontrada?.nombre || `ID: ${c.id_mascota?.substring(0, 5)}...`}
                  </td>
                  <td>
                    {c.veterinario?.nombre || (veterinarioEncontrado ? `Dr. ${veterinarioEncontrado.nombre}` : `ID: ${c.id_veterinario?.substring(0, 5)}...`)}
                  </td>
                  <td>{c.fecha} a las {c.hora}</td>
                  <td className="small text-muted">{c.motivo}</td>
                  <td className="text-center">
                    <button 
                      className="btn btn-sm btn-outline-danger border-0" 
                      onClick={() => { if(confirm("¿Borrar?")) api.delete(`/citas/${c.id_cita || c.id}`).then(fetchData) }}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}