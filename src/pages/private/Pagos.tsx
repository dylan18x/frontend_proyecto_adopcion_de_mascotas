import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function PagosPage() {
  const { user } = useAuth();
  const [pagos, setPagos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fecha: new Date().toISOString().split('T')[0],
    monto: "",
    metodo_pago: "",
    username_donante: "" 
  });

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const res = await api.get("/pagos");
      // Manejamos la estructura de items del backend
      const data = res.data.items || (Array.isArray(res.data) ? res.data : []);
      setPagos(data);
    } catch (error) {
      console.error("Error al cargar:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { cargarDatos(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      fecha: formData.fecha,
      monto: Number(formData.monto),
      metodo_pago: formData.metodo_pago,
      // Enviamos el username_donante que el backend ya aceptó
      username_donante: user?.username || formData.username_donante || "anonimo"
    };

    try {
      if (editId) {
        await api.put(`/pagos/${editId}`, payload);
      } else {
        await api.post("/pagos", payload);
      }
      resetForm();
      cargarDatos();
      alert("Pago registrado correctamente");
    } catch (error) {
      alert("Error al guardar en el servidor");
    }
  };

  const prepararEdicion = (p: any) => {
    setEditId(p.id_pago);
    setFormData({
      fecha: p.fecha.split('T')[0],
      monto: p.monto.toString(),
      metodo_pago: p.metodo_pago,
      username_donante: p.username_donante || p.usuario?.username || ""
    });
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({
      fecha: new Date().toISOString().split('T')[0],
      monto: "",
      metodo_pago: "",
      username_donante: ""
    });
  };

  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-md-5">
          <div className="card shadow-sm border-0 p-4">
            <h4 className="fw-bold mb-4">Donación</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-bold">USERNAME</label>
                <input 
                  type="text" 
                  className="form-control bg-light" 
                  value={user?.username || formData.username_donante} 
                  disabled={!!user}
                  onChange={(e) => setFormData({...formData, username_donante: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold">MONTO ($)</label>
                <input type="number" className="form-control" value={formData.monto}
                  onChange={(e) => setFormData({...formData, monto: e.target.value})} required />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold">MÉTODO</label>
                <select className="form-select" value={formData.metodo_pago}
                  onChange={(e) => setFormData({...formData, metodo_pago: e.target.value})} required>
                  <option value="">Seleccionar...</option>
                  <option value="tarjeta">Tarjeta</option>
                  <option value="efectivo">Efectivo</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary w-100 rounded-pill">
                {editId ? 'ACTUALIZAR' : 'ENVIAR'}
              </button>
            </form>
          </div>
        </div>

        <div className="col-md-7">
          <div className="card shadow-sm border-0 overflow-hidden">
            <table className="table align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th className="ps-4">Usuario</th>
                  <th>Monto</th>
                  <th className="text-end pe-4">Acción</th>
                </tr>
              </thead>
              <tbody>
                {pagos.map((p) => (
                  <tr key={p.id_pago}>
                    <td className="ps-4">
                      {/* Leemos el username del nuevo campo o del objeto usuario */}
                      <span className="fw-bold">{p.username_donante || p.usuario?.username || "Anónimo"}</span>
                    </td>
                    <td className="text-success fw-bold">${Number(p.monto).toFixed(2)}</td>
                    <td className="text-end pe-4">
                      <button className="btn btn-sm btn-outline-warning" onClick={() => prepararEdicion(p)}>Editar</button>
                    </td>
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