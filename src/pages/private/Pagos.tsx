import { useEffect, useState } from "react";
import { api } from "../../services/api";

export default function DonacionesPage() {
  const [donaciones, setDonaciones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fecha: new Date().toISOString().split('T')[0],
    cantidad: "",
    metodo: ""
  });

  // Cargar todas las donaciones
  const cargarDatos = async () => {
    try {
      setLoading(true);
      const res = await api.get("/donaciones");
      setDonaciones(res.data.items || res.data || []);
    } catch (error) {
      console.error("Error al cargar donaciones:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      fecha: formData.fecha,
      cantidad: parseFloat(formData.cantidad),
      metodo: formData.metodo
    };

    try {
      if (editId) {
        await api.put(`/donaciones/${editId}`, payload);
        alert("¡Donación actualizada!");
      } else {
        await api.post("/donaciones", payload);
        alert("¡Donación registrada!");
      }
      resetForm();
      cargarDatos();
    } catch (error: any) {
      console.error(error.response?.data);
      alert("Error al procesar la donación.");
    }
  };

  const prepararEdicion = (d: any) => {
    setEditId(d.id_donacion);
    setFormData({
      fecha: d.fecha ? d.fecha.split('T')[0] : "",
      cantidad: d.cantidad.toString(),
      metodo: d.metodo
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const eliminarDonacion = async (id: string) => {
    if (!confirm("¿Seguro que deseas eliminar esta donación?")) return;
    try {
      await api.delete(`/donaciones/${id}`);
      cargarDatos();
    } catch {
      alert("Error al eliminar.");
    }
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({
      fecha: new Date().toISOString().split('T')[0],
      cantidad: "",
      metodo: ""
    });
  };

  // Calculamos top de donadores por ID (suma de sus donaciones)
  const topDonadores = Object.values(
    donaciones.reduce((acc: any, d: any) => {
      const id = d.id_cliente || "Anonimo";
      if (!acc[id]) acc[id] = { id, total: 0 };
      acc[id].total += d.cantidad;
      return acc;
    }, {})
  ).sort((a: any, b: any) => b.total - a.total).slice(0, 5); // top 5

  return (
    <div className="container mt-4">

      {/* Top Donadores */}
      {topDonadores.length > 0 && (
        <div className="mb-4">
          <h4 className="fw-bold text-primary">🏆 Top Donadores</h4>
          <ul className="list-group list-group-flush">
            {topDonadores.map((d: any) => (
              <li key={d.id} className="list-group-item d-flex justify-content-between align-items-center">
                {d.id}
                <span className="fw-bold text-success">${d.total.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Formulario de Donaciones */}
      <div className="card border-0 shadow-sm mb-5 bg-light">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-4">
              <label className="form-label small fw-bold text-secondary">CANTIDAD ($)</label>
              <input
                type="number" step="0.01"
                className="form-control border-0 shadow-sm"
                placeholder="0.00"
                value={formData.cantidad}
                onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label small fw-bold text-secondary">MÉTODO</label>
              <select
                className="form-select border-0 shadow-sm"
                value={formData.metodo}
                onChange={(e) => setFormData({ ...formData, metodo: e.target.value })}
                required
              >
                <option value="">-- Seleccionar --</option>
                <option value="Efectivo">Efectivo</option>
                <option value="Transferencia">Transferencia</option>
                <option value="Tarjeta de Débito">Tarjeta de Débito</option>
                <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
              </select>
            </div>

            <div className="col-md-2">
              <label className="form-label small fw-bold text-secondary">FECHA</label>
              <input
                type="date"
                className="form-control border-0 shadow-sm"
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                required
              />
            </div>

            <div className="col-12 text-end mt-4">
              {editId && (
                <button type="button" className="btn btn-outline-secondary me-2 px-4" onClick={resetForm}>
                  CANCELAR
                </button>
              )}
              <button type="submit" className={`btn px-5 fw-bold text-white shadow-sm ${editId ? 'btn-warning' : 'btn-success'}`}>
                {editId ? "ACTUALIZAR DONACIÓN" : "DONAR"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Historial de Donaciones */}
      <div className="table-responsive bg-white rounded-4 shadow-sm">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th className="ps-4">ID Donante</th>
              <th className="text-center">Cantidad</th>
              <th className="text-center">Método</th>
              <th className="text-center">Fecha</th>
              <th className="text-center pe-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="py-5 text-center text-muted">Cargando donaciones...</td></tr>
            ) : donaciones.length === 0 ? (
              <tr><td colSpan={5} className="py-5 text-center text-muted">No hay donaciones registradas.</td></tr>
            ) : donaciones.map((d) => (
              <tr key={d.id_donacion}>
                <td className="ps-4">{d.id_cliente || "Anonimo"}</td>
                <td className="text-center text-success fw-bold">
                  ${Number(d.cantidad).toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                </td>
                <td className="text-center">
                  <span className="badge rounded-pill bg-light text-dark border px-3">{d.metodo}</span>
                </td>
                <td className="text-center text-secondary">
                  {new Date(d.fecha).toLocaleDateString()}
                </td>
                <td className="text-center pe-4">
                  <button className="btn btn-sm btn-outline-warning me-2" onClick={() => prepararEdicion(d)}>Editar</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarDonacion(d.id_donacion)}>Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
