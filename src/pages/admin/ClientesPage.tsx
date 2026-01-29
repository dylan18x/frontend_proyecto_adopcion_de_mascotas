import { useState, useEffect } from "react";
import { api } from "../../services/api";

export default function PagosPage() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fecha: new Date().toISOString().split('T')[0],
    monto: "",
    metodo_pago: "",
    id_cliente: ""
  });

  // Cargar clientes
  const cargarClientes = async () => {
    try {
      const res = await api.get("/clientes");
      setClientes(res.data.items || res.data || []);
    } catch (error) {
      console.error("Error al cargar clientes:", error);
    }
  };

  useEffect(() => {
    cargarClientes();
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
    } catch (error: any) {
      console.error(error.response?.data);
      alert("Error al procesar el pago. Verifica los datos.");
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
      <h2 className="fw-bold text-primary mb-4">
        {editId ? "✏️ Editando Pago" : "💰 Registrar Pago"}
      </h2>

      <div className="card border-0 shadow-sm bg-light">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-4">
              <label className="form-label small fw-bold text-secondary">SELECCIONAR CLIENTE</label>
              <select
                className="form-select border-0 shadow-sm"
                value={formData.id_cliente}
                required
                onChange={(e) => setFormData({ ...formData, id_cliente: e.target.value })}
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
                type="number"
                step="0.01"
                className="form-control border-0 shadow-sm"
                placeholder="0.00"
                value={formData.monto}
                onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label small fw-bold text-secondary">MÉTODO DE PAGO</label>
              <select
                className="form-select border-0 shadow-sm"
                value={formData.metodo_pago}
                onChange={(e) => setFormData({ ...formData, metodo_pago: e.target.value })}
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
                {editId ? "ACTUALIZAR PAGO" : "GUARDAR PAGO"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
