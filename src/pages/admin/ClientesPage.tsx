import { useEffect, useState } from "react";
import { api } from "../../services/api";

export default function PagosAdminPage() {
  const [pagos, setPagos] = useState<any[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fecha: new Date().toISOString().split('T')[0],
    monto: "",
    metodo_pago: "",
    id_cliente: "" 
  });

  // Carga inicial de datos
  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [resC, resP] = await Promise.all([
        api.get("/clientes"),
        api.get("/pagos")
      ]);
      setClientes(resC.data.items || resC.data || []);
      setPagos(resP.data.items || resP.data || []);
    } catch (error) {
      console.error("Error al cargar datos:", error);
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
      monto: parseFloat(formData.monto),
      metodo_pago: formData.metodo_pago,
      id_cliente: formData.id_cliente
    };

    try {
      if (editId) {
        await api.put(`/pagos/${editId}`, payload);
        alert("¡Pago actualizado!");
      } else {
        await api.post("/pagos", payload);
        alert("¡Pago registrado!");
      }
      resetForm();
      cargarDatos();
    } catch (error: any) {
      console.error("Error en el servidor:", error.response?.data);
      alert("Error al procesar el pago. Verifica los datos.");
    }
  };

  const prepararEdicion = (p: any) => {
    setEditId(p.id_pago);
    setFormData({
      fecha: p.fecha ? p.fecha.split('T')[0] : "",
      monto: p.monto.toString(),
      metodo_pago: p.metodo_pago,
      id_cliente: p.cliente?.id || p.id_cliente || ""
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const eliminarPago = async (id: string) => {
    if (!confirm("¿Seguro que deseas eliminar este registro?")) return;
    try {
      await api.delete(`/pagos/${id}`);
      cargarDatos();
    } catch (error) {
      alert("Error al eliminar.");
    }
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({
      fecha: new Date().toISOString().split('T')[0],
      monto: "",
      metodo_pago: "",
      id_cliente: ""
    });
  };

  return (
    <div className="container mt-4">
      {/* Formulario de Administración */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className={`fw-bold mb-0 ${editId ? 'text-warning' : 'text-primary'}`}>
          {editId ? "✏️ Editando Pago" : "💰 Registro de Pagos"}
        </h2>
      </div>

      <div className="card border-0 shadow-sm mb-5 bg-light">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-4">
              <label className="form-label small fw-bold text-secondary">SELECCIONAR CLIENTE</label>
              <select 
                className="form-select border-0 shadow-sm" 
                value={formData.id_cliente} 
                required
                onChange={(e) => setFormData({...formData, id_cliente: e.target.value})}
              >
                <option value="">-- Seleccionar --</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label small fw-bold text-secondary">MONTO ($)</label>
              <input 
                type="number" step="0.01"
                className="form-control border-0 shadow-sm" 
                placeholder="0.00"
                value={formData.monto}
                onChange={(e) => setFormData({...formData, monto: e.target.value})}
                required 
              />
            </div>

            <div className="col-md-3">
              <label className="form-label small fw-bold text-secondary">MÉTODO DE PAGO</label>
              <select 
                className="form-select border-0 shadow-sm" 
                value={formData.metodo_pago}
                onChange={(e) => setFormData({...formData, metodo_pago: e.target.value})}
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
                onChange={(e) => setFormData({...formData, fecha: e.target.value})} 
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
                {editId ? "ACTUALIZAR REGISTRO" : "GUARDAR PAGO"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Listado de Pagos */}
      <div className="table-responsive bg-white rounded-4 shadow-sm">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th className="ps-4">Cliente</th>
              <th className="text-center">Monto</th>
              <th className="text-center">Método</th>
              <th className="text-center">Fecha</th>
              <th className="text-center pe-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="py-5 text-center text-muted">Cargando transacciones...</td></tr>
            ) : pagos.length === 0 ? (
              <tr><td colSpan={5} className="py-5 text-center text-muted">No hay pagos registrados.</td></tr>
            ) : pagos.map((p) => (
              <tr key={p.id_pago}>
                <td className="ps-4">
                  <div className="fw-bold text-dark">
                    {p.cliente?.nombre || <span className="text-danger small">⚠️ Cliente no vinculado</span>}
                  </div>
                  <div className="small text-muted" style={{fontSize: '11px'}}>ID: {p.id_pago.split('-')[0]}</div>
                </td>
                <td className="text-center">
                  <span className="text-success fw-bold">
                    ${Number(p.monto).toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                  </span>
                </td>
                <td className="text-center">
                  <span className="badge rounded-pill bg-light text-dark border px-3">
                    {p.metodo_pago}
                  </span>
                </td>
                <td className="text-center text-secondary">
                  {new Date(p.fecha).toLocaleDateString()}
                </td>
                <td className="text-center pe-4">
                  <button className="btn btn-sm btn-outline-warning me-2" onClick={() => prepararEdicion(p)}>
                    Editar
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarPago(p.id_pago)}>
                    Borrar
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
