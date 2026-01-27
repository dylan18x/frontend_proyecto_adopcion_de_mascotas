import { useEffect, useState } from "react";
import { api } from "../../services/api";

export default function MisPagosPage() {
  const [pagos, setPagos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarMisPagos = async () => {
    try {
      setLoading(true);
      // Este endpoint debe filtrar los pagos del usuario logueado en el backend
      const res = await api.get("/pagos/mis-pagos");
      setPagos(res.data.items || res.data || []);
    } catch (error) {
      console.error("Error al cargar tus pagos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarMisPagos();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col">
          <h2 className="fw-bold text-primary">📄 Mi Historial de Pagos</h2>
          <p className="text-muted">Consulta aquí el registro de tus transacciones realizadas.</p>
        </div>
      </div>

      {pagos.length === 0 ? (
        <div className="alert alert-info shadow-sm border-0 text-center py-5">
          <h4 className="alert-heading">Sin movimientos</h4>
          <p className="mb-0">Aún no tienes pagos registrados en tu cuenta.</p>
        </div>
      ) : (
        <div className="row g-4">
          {pagos.map((p) => (
            <div className="col-12 col-md-6 col-lg-4" key={p.id_pago}>
              <div className="card h-100 border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">
                      Completado
                    </span>
                    <small className="text-muted font-monospace">
                      Ref: {p.id_pago.substring(0, 8)}
                    </small>
                  </div>

                  <h3 className="fw-bold mb-3 text-dark">
                    ${Number(p.monto).toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                  </h3>

                  <hr className="text-muted opacity-25" />

                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex align-items-center text-secondary">
                      <i className="bi bi-calendar-event me-2"></i>
                      <span className="small">
                        <strong>Fecha:</strong> {new Date(p.fecha).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="d-flex align-items-center text-secondary">
                      <i className="bi bi-credit-card me-2"></i>
                      <span className="small">
                        <strong>Método:</strong> {p.metodo_pago}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}